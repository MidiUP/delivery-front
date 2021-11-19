import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Properties } from "../Properties";
import { Order } from "./order.model";



@Injectable()
export class orderService{
    
    baseUrl = `${environment.url}/v1/orders`


    constructor(private http: HttpClient){}

    createOrder(order: Order): Observable<Order>{
        return this.http.post<Order>(`${this.baseUrl}`, order);
    }

    getOrders():Observable<Order[]>{
        return this.http.get<Order[]>(`${this.baseUrl}`);
    }

    getOrder(id: number):Observable<Order>{
        return this.http.get<Order>(`${this.baseUrl}/${id}`);
    }

    deletOrder(id:number){
        return this.http.delete<Order>(`${this.baseUrl}/${id}`);
    }

    putOrder(order: Order, id:number){
        return this.http.put(`${this.baseUrl}/${id}`,order);
    }

    getOrdersByDate(){
        return this.http.get<Order[]>(`${this.baseUrl}/date`);
    }

    getOrdersByDates(dataInicial: string, dataFinal: string ){
        return this.http.get<Order[]>(`${this.baseUrl}/date?dataFim=${dataFinal}&dataInicio=${dataInicial}`);
    }

    getOrdersByUserInDate(id: number){
        return this.http.get<Order[]>(`${this.baseUrl}/user/find/${id}`);
    }
}