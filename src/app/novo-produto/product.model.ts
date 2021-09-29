import { Categoria } from "../categorias/categoria.model";
import { Adicional } from "./adicional.model";

export class Product{
    constructor(
        public name: string,
        public price: number,
        public description: string,
        public availability: boolean,
        public quantity: number,
        public rate: number,
        public quantityCar: number,
        public total: number,
        public id: number,
        public category: Categoria,
        public additional?: Adicional[],
        public additionalsString?: string
    ){}
}