import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Adicional } from "../novo-produto/adicional.model";
import { Properties } from "../Properties";

@Injectable()
export class AdicionalService{

    baseUrl: string = "http://89.40.5.41:8080/v1/additionals"

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
        return this.http.put(`${this.baseUrl}/${id}`,adicional);
    }

}