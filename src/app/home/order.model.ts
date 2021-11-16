import { MetodoPagamento } from "../metodo-pagamento/metodoPagamento.model";
import { Bairro } from "../novo-bairro/bairro.model";
import { User } from "../user/user.model";
import { Cupom } from "./cupom.model";
import { Items } from "./items.model";
import { Status } from "./status.model";

export class Order{
    constructor(
        public id: number,
        public user: User, 
        public paymentMethod: string,
        public status: Status,
        public total: number,
        public items: Items[],
        public note: string,
        public deliveryFee: number,
        public address?: string,
        public isDelivery?: boolean,
        public coupon?: Cupom,
        public thing?: number
    ){}
}