import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Bairro } from "./bairro.model";


@Injectable()
export class bairroService{
    
    baseUrl = "https://teste-api-delivery.herokuapp.com/v1/neighborhoods"

    constructor(private http: HttpClient){}

    createBairro(bairro: Bairro): Observable<Bairro>{
        return this.http.post<Bairro>(`${this.baseUrl}`, bairro);
    }

    getBairros():Observable<Bairro[]>{
        return this.http.get<Bairro[]>(`${this.baseUrl}`);
    }

    getBairro(id: number):Observable<Bairro>{
        return this.http.get<Bairro>(`${this.baseUrl}/${id}`);
    }

    deleteBairro(id:number){
        return this.http.delete<Bairro>(`${this.baseUrl}/${id}`);
    }

    putBairro(bairro: Bairro, id:number){
        return this.http.put(`${this.baseUrl}/${id}`,bairro)
    }

}