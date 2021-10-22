import { Adicional } from "../novo-produto/adicional.model";
import { Product } from "../novo-produto/product.model";

export class additionalPedidos {
    constructor(
        public additional: Adicional,
        public quantity: number
    ){}
}

export class Items{
    constructor(
        public quantityProduct: number,
        public product: Product,
        public additionalPedidos: additionalPedidos[],
        public additionalPedidosRequired: additionalPedidos[]
    ){}
}