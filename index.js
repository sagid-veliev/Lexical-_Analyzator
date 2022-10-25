import fs from 'fs';
import {types, operators, keywords, keysymbols} from './constants/constants.js';
import {Variable} from './models/Variable.js';
import {Lexem} from './models/Lexem.js';
import {LexemProcessorStates} from './constants/LexemProcessorStates.js';
import {Error} from './models/Error.js'
let state = LexemProcessorStates.Idle;
let lexems = [];
let variables = [];

const fileReader = () => {
    let text = '';
    const stream = fs.createReadStream('examples/file2.txt');
    stream.on('data', (chunk) => {
        text = chunk.toString();
        text = text.replace(/\r\n/g, "");
        text = text.replace(/\++/g, " ++");
        text = replaceLexems(text);
        readProgram(text);
    });
}

const readProgram = (program) => {
    let variable = new Variable();
    for (let item of program.split(' ')) {
        if (!IsEmptyOrNextLine(item) && state !== LexemProcessorStates.Final) {
            switch (state) {
                case LexemProcessorStates.Idle:
                    if (isType(item)) {
                        addLexem('DataType', isType(item).id, isType(item).type[item]);
                        variable.dataType = isType(item).type[item];
                        variable.id = variables.length;
                        state = LexemProcessorStates.ReadingIdentifier;
                    } else if (isKeyWord(item) && item === 'while') {
                        addLexem('Identifier', 0, item);
                        state = LexemProcessorStates.ReadingIdentifier;
                    } else {
                        new Error().getError(item);
                        state = LexemProcessorStates.Error;
                    }
                    break;
                case LexemProcessorStates.ReadingIdentifier:
                    if (isVariable(item)) {
                        addLexem('Variable', variable.id, `variable <${item}> of type <${ variable.dataType }>`);
                        addVariable(variables.length, variable.dataType, item);
                        state = LexemProcessorStates.ReadingVariable;
                    } else if (isKeySymbol(item)) {
                        addLexem('Delimeter', isKeySymbol(item).id, item);
                        state = LexemProcessorStates.Delimeter;
                    } else {
                        new Error().getError(item);
                        state = LexemProcessorStates.Error;
                    }
                    break;
                case LexemProcessorStates.ReadingVariable:
                    if (isOperator(item)) {
                        addLexem('Operation', isOperator(item).id, isOperator(item).operator);
                        state = LexemProcessorStates.Delimeter;
                    } else if (isKeySymbol(item)) {
                        addLexem('Delimeter', isKeySymbol(item).id, item);
                        state = LexemProcessorStates.Delimeter;
                    }  else {
                        new Error().getError(item);
                        state = LexemProcessorStates.Error;
                    }
                    break;
                case LexemProcessorStates.Delimeter:
                    if (isNumeric(+item)) {
                        addLexem('Constant', item, `${variable.dataType} with value = ${item}`);
                        state = LexemProcessorStates.ReadingNum;
                    } else if (isKeyWord(item) && item === 'while') {
                        addLexem('Identifier', isKeyWord(item).id, item);
                        state = LexemProcessorStates.ReadingIdentifier;
                    } else if (isVariable(item)) {
                        addLexem('Variable', variable.id, `variable <${item}> of type <${ variable.dataType }>`);
                        addVariable(variables.length, variable.dataType, item);
                        state = LexemProcessorStates.ReadingVariable;
                    } else if (isKeySymbol(item)) {
                        addLexem('Delimeter', isKeySymbol(item).id, item);
                        state = LexemProcessorStates.Delimeter;
                    } else if (isOperator(item)) {
                        addLexem('Operation', isOperator(item).id, isOperator(item).operator);
                        state = LexemProcessorStates.Delimeter;
                    } else if (isType(item)) {
                        addLexem('DataType', isType(item).id, isType(item).type[item]);
                        variable.dataType = isType(item).type[item];
                        variable.id = variables.length;
                        state = LexemProcessorStates.ReadingIdentifier;
                    } else {
                        new Error().getError(item);
                        state = LexemProcessorStates.Error;
                    }
                    break;
                case LexemProcessorStates.ReadingNum:
                    if (isKeySymbol(item)) {
                        addLexem('Delimeter', isKeySymbol(item).id, item);
                        state = LexemProcessorStates.Delimeter;
                    } else {
                        new Error().getError(item);
                        state = LexemProcessorStates.Error;
                    }
                    break;
                case LexemProcessorStates.Error:
                    break;
            }
        }
    }
    getList(lexems, variables);
}

const getList = (lexems,  variables) => {
    console.log('Lexems:');
    console.log(lexems);
    console.log('------------');
    console.log('Variables:');
    console.log(variables);
}

const IsEmptyOrNextLine = (input) => {
    return input == ' '
        || input == '\n'
        || input == '\t'
        || input == '\0'
        || input == '\r\n'
        || !input.length
}

const addLexem = (type, id, value) => {
    lexems.push(new Lexem(type, id, value).toString());
}

const addVariable = (id, dataType, name) => {
    variables.push(new Variable(id, dataType, name).toString());
}

const replaceLexems = (program) => {
    let modifiedProgram = '';
    for (let lexem of program) {
        lexem = lexem.replace(/\++\\.|,|;|\(|\)|\[|\]|\{|\}/g, ` ${lexem} `);
        modifiedProgram += lexem;
    }
    return modifiedProgram;
}

const isType = (input) => {
    let result = false;
    types.forEach((type, id) => {
        if (type.hasOwnProperty(input)) result = { type, id };
    })
    return result;
} 

const isKeyWord = (input) => {
    let result = '';
    keywords.forEach((keyword, id) => {
        if (keyword === input) result = { keyword, id };
    })
    return result;
}

const isVariable = (input) => {
    if (!isKeyWord(input) && !isType(input)) {
        return !input.match(/^\d/) && input.match(/\w/gi) && input.match(/\w/gi).length === input.length;
    }
}

const isOperator = (input) => {
    let result = '';
    operators.forEach((operator, id) => {
        if (operator.hasOwnProperty(input)) {
            result = { operator: operator[input], id };
        }
    })
    return result;
}

const isNumeric = (num) => {
    return !isNaN(num) && typeof num === 'number'; 
}

const isKeySymbol = (input) => {
    let result = '';
    keysymbols.forEach((keysymbol, id) => {
        if(keysymbol === input) result = { keysymbol, id };
    })
    return result;
}

fileReader();
