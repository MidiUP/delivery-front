import { Banner } from "./banner.model";

export class Empresa{
    constructor(
        public id: number,
        public name: string,
        public username: string,
        public password: string,
        public slogan: string,
        public cnpj: string,
        public address: string,
        public telefone: string,
        public whatsapp: string,
        public open: boolean,
        public banners: Banner[],
        public opening_hours: string,
        public backgroundPath: string,
        public minValue: number,
        public linkGoogleMaps?: string,
        public logoPath?: string,
    ){}
}