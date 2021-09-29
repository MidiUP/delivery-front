export class Adicional{
    constructor(
        public name: string,
        public price: number,
        public description: string,
        public quantity: number,
        public quantityCar: number = 0,
        public total: number,
        public id: number
    ){}
}