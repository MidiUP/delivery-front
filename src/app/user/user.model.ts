import { Address } from "./adicionar-endereco/address.model";

export class User{

    constructor(
        public name: string,
        public email: string,
        public password: string,
        public cpf: string,
        public rg: string,
        public phone: string,
        public address: Address,
        public id?: number,
    ){}

}