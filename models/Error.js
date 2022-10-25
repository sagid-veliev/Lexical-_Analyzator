export class Error {
    constructor(lexem) {
        this.lexem = lexem;
    }

    getError(lexem) {
        console.log(`Error: In the lexem <${lexem}>!`)
    }
}