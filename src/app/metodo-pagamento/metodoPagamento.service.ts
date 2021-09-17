import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MetodoPagamento } from "./metodoPagamento.model";



@Injectable()
export class metodoPagamentoService{
    
    baseUrl = "https://teste-api-delivery.herokuapp.com/v1/paymentMethods"

    constructor(private http: HttpClient){}

    createMetodoPagamento(metodoPagamento: MetodoPagamento): Observable<MetodoPagamento>{
        return this.http.post<MetodoPagamento>(`${this.baseUrl}`, metodoPagamento);
    }

    getMetodosPagamentos():Observable<MetodoPagamento[]>{
        return this.http.get<MetodoPagamento[]>(`${this.baseUrl}`);
    }

    getMetodoPagamento(id: number):Observable<MetodoPagamento>{
        return this.http.get<MetodoPagamento>(`${this.baseUrl}/${id}`);
    }

    deleteMetodoPagamento(id:number){
        return this.http.delete<MetodoPagamento>(`${this.baseUrl}/${id}`);
    }

    putMetodoPagamento(metodoPagamento: MetodoPagamento, id:number){
        return this.http.put(`${this.baseUrl}/${id}`,metodoPagamento)
    }

}