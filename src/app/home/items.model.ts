import { Product } from "../novo-produto/product.model";

export class Items{
    constructor(
        public quantityProduct: number,
        public product: Product
    ){}
}