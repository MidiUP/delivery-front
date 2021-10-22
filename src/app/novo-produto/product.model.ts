import { Categoria } from "../categorias/categoria.model";
import { additionalPedidos } from "../home/items.model";
import { additionalRequired, Adicional } from "./adicional.model";

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
        public imagePath: string,
        public additional?: Adicional[],
        public additionalsString?: string,
        public arrayAdicionais?: additionalPedidos[],
        public arrayAdicionaisRequired?: additionalPedidos[],
        public additionalRequired?: additionalRequired[]
    ){}
}