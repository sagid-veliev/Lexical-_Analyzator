let fileContent = '';

function fileRead (file) {
    const fs = require('fs');
    fileContent = fs.readFileSync(file, 'utf8');
    lexicalAnalyze(fileContent);
    // console.log(fileContent);
}

function lexicalAnalyze (text) {
    let lexem = '';
    let str = '';
    let state = '';
    let pos = 0;
    for (let s of text) {
        if (s !== ' ') {
            lexem += s;
        } else {
            pos++;
            if (lexem === isOperator()) {
                state += `<ID, ${pos}>`
                console.log(true);
            } else {
                console.log(false);
            }
        }
    }
    console.log(lexem);

    // for (let s of text) {
    //     while (s) {
    //         console.log(s);
    //         lexem += s;
    //     }
    // }
}

function isOperator (lexem) {
    return ['while', 'int', 'long', 'string'].includes(lexem);
}

fileRead('file.txt');


