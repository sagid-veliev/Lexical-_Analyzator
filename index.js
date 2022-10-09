import fs from 'fs';
import {types, operators, keywords, keysymbols} from './constants/constants.js';
import {Variable} from './models/Variables.js';
import {Lexem} from './models/Lexem.js';
import {LexemProcessorStates} from './constants/LexemProcessorStates.js'
let lexems = [];
let variables = [];

function fileReader () {
    let text = '';
    const stream = fs.createReadStream('examples/file.txt');
    stream.on('data', (chunk) => {
        text = chunk.toString();
        readProgram(text);
    });
}

function readProgram(program) {
    let i = 0;
    program = program.replace(/\r\n/g, "");
    program = replaceLexems(program);
    console.log(program);
    for (let item of program.split(' ')) {
        if (!IsEmptyOrNextLine(item)) {
            if (searchTypes(item)) {
                addLexem('DataType', searchTypes(item).id, searchTypes(item).type[item])
            } else if (searchOperators(item)) {
                addLexem('Operation', searchOperators(item).id, searchOperators(item).operator[item]);
            } else if (searchKeywords(item)) {
                addLexem('Identifier', searchKeywords(item).id, searchKeywords(item).keyword);
            } else if (searchKeysymbols(item)) {
                addLexem('Delimeter', searchKeysymbols(item).id, searchKeysymbols(item).keysymbol)
            } else {
                
            }
        }
    }
    console.log(lexems)
}

function IsEmptyOrNextLine(input) {
    return input == ' '
        || input == '\n'
        || input == '\t'
        || input == '\0'
        || input == '\r\n'
        || !input.length
}


function addLexem(type, id, value) {
    lexems.push(new Lexem(type, id, value).toString());
}

function replaceLexems (program) {
    let modifiedProgram = '';
    for (let lexem of program) {
        lexem = lexem.replace(/\\.|,|;|\(|\)|\[|\]|\{|\}/g, ` ${lexem} `);
        modifiedProgram += lexem;
    }
    return modifiedProgram;
}

function searchTypes (input) {
    let result = false;
    types.forEach((type, id) => {
        if (type.hasOwnProperty(input)) result ={ type, id };
    })
    return result;
} 

function searchOperators (input) {
    let result = false;
    operators.forEach((operator, id) => {
        if(operator.hasOwnProperty(input)) result = { operator, id };
    })
    return result;
}

function searchKeywords (input) {
    let result = '';
    keywords.forEach((keyword, id) => {
        if(keyword === input) result = { keyword, id };
    })
    return result;
}
function searchKeysymbols (input) {
    let result = '';
    keysymbols.forEach((keysymbol, id) => {
        if(keysymbol === input) result = { keysymbol, id };
    })
    return result;
}

fileReader();
