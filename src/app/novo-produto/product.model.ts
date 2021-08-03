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
        public id?: number,
    ){}
}