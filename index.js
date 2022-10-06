// let fileContent = '';
import fs from 'fs';
import {types, operators, keywords} from './constants/constants.js';

function fileReader () {
    let text = '';
    const stream = fs.createReadStream('file.txt');
    stream.on('data', (chunk) => {
        text = chunk.toString();
        iteration(text);
    });
}

function iteration(program) {
    let i = 0;
    for (let item of program) {
        if (item === '\n') {
            
        }
    }
}


function IsEmptyOrNextLine (input) {
    return input == ' ' || input == '\n' || input == '\t' || input == '\0' || input == '\r';
}

function clearBuffer (buffer) {
    buffer = '';
    return buffer;
}

function addtoBuffer (input) {
    buffer += input
}

function searchTypes (types, input) {
    let type = '';
    let lexem = [];
    types.forEach((item, index) => {
        type = Object.keys(item).toString();
        if ( type === input ) {            
            lexem.push(`lexem type: DataType;    lexem id: ${index};    value: ${Object.values(item)}`, )
        }
    })
} 

// function lexenTypes (input) {

// }
searchTypes(types, 'string');











// function fileRead (file) {
//     const fs = require('fs');
//     fileContent = fs.readFileSync(file, 'utf8');
//     lexicalAnalyze(fileContent);
//     // console.log(fileContent);
// }

// function lexicalAnalyze (text) {
//     let lexem = '';
//     let str = '';
//     let state = '';
//     let pos = 0;
//     for (let s of text) {
//         if (s !== ' ') {
//             lexem += s;
//         } else {
//             pos++;
//             if (lexem === isOperator()) {
//                 state += `<ID, ${pos}>`
//                 console.log(true);
//             } else {
//                 console.log(false);
//             }
//         }
//     }
//     console.log(lexem);

//     // for (let s of text) {
//     //     while (s) {
//     //         console.log(s);
//     //         lexem += s;
//     //     }
//     // }
// }

// function isOperator (lexem) {
//     return ['while', 'int', 'long', 'string'].includes(lexem);
// }

// fileRead('file.txt');


