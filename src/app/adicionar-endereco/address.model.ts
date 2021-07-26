export class Address{
    
    constructor(
        public street: string,
        public neighborhood: string,
        public number: string,
        public complement: string,
        public city: string,
        public cep: string
    ){}
}