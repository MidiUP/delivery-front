import { Bairro } from "src/app/novo-bairro/bairro.model";
import { User } from "../user/user.model";

export class Address{
    constructor(
        public street: string,
        public neighborhood: Bairro,
        public number: string,
        public complement: string,
        public city: string,
        public cep: string,   
        public userRestaurant: User,
        public id: number     
    ){}
}