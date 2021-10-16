import { Adicional } from "./adicional.model";

export class AdicionalObrigatorio{
    constructor(
        public name: string,
        public QuantidadeMax: number,
        public QuantidadeMin: number,
        public additionals: Adicional[]
    ){}
}