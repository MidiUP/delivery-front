export class Empresa{
    constructor(
        public name: string,
        public slogan: string,
        public cnpj: string,
        public endereco: string,
        public telefone: string,
        public whatsapp: string,
        public linkWhatsapp: string,
        public key: number,
        public linkGoogleMaps?: string
    ){}
}