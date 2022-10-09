export class Lexem {

    constructor (type, lex, value) {
        this.type = type;
        this.lex = lex;
        this.value = value;
    }

    toString() {
        return `lexem type: ${this.type}; lexem id: ${this.lex}; value: ${this.value}`;
    }

}


