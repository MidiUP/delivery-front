import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Adicional } from "../novo-produto/adicional.model";

@Injectable()
export class AdicionalService{

    baseUrl = "http://localhost:8080/v1/additionals"

    constructor(private http: HttpClient){}

    createAdicional(adicional: Adicional): Observable<Adicional>{
        return this.http.post<Adicional>(`${this.baseUrl}`, adicional);
    }

    getAdicionals():Observable<Adicional[]>{
        return this.http.get<Adicional[]>(`${this.baseUrl}`);
    }

    getAdicional(id: number):Observable<Adicional>{
        return this.http.get<Adicional>(`${this.baseUrl}/${id}`);
    }

    deleteAdicional(id:number){
        return this.http.delete<Adicional>(`${this.baseUrl}/${id}`);
    }

    putAdicional(adicional: Adicional, id:number){
        return this.http.put(`${this.baseUrl}/${id}`,adicional)
    }

}