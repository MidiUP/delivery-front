export class Empresa{
    constructor(
        public id: number,
        public name: string,
        public username: string,
        public password: string,
        public slogan: string,
        public cnpj: string,
        public endereco: string,
        public telefone: string,
        public whatsapp: string,
        public linkGoogleMaps?: string,
        public logoPath?: string
    ){}
}