import { Address } from "../adicionar-endereco/address.model";

export class User_ {

    constructor(
        public id:number,
        public name:string,
        public email:string,
        public password:string,
        public cpf:string,
        public rg:string,
        public phone:string,
        public address: Address[],
        //criar ListOrders
    ){}
}