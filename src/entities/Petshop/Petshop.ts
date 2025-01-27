import {v4} from 'uuid';

export class Petshop {
    id: string;
    name: string;
    cnpj: string;
    pets: object[];

    constructor(name: string, cnpj: string) {
        this.id = v4();
        this.name = name;
        this.cnpj = cnpj;
        this.pets = [];
    }
}