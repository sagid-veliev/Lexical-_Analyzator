export class Variable {

    constructor (id, dataType, name) {
        this.id = id;
        this.dataType = dataType;
        this.name = name;
    }

    toString() {
        return `${this.id} Variable of type ${this.dataType} with name ${this.name}`
    }

}
