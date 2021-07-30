export class Produto{
    
    constructor(
        public id: number,
        public name: String,
        public price: number,
        public description: String,
        public availability: boolean,
        public quantity: number,
        public quantityCar: number,
        public precoTotal: number
     
    ){}
}