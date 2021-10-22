import { Adicional } from "./adicional.model";

export class additionalRequired{
    constructor(
        public name: string,
        public quantityMax: number,
        public quantityMin: number,
        public additional: Adicional[]
    ){}
}