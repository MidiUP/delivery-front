import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Empresa } from "./empresa.model";

@Injectable()
export class EmpresaService{

    baseUrl = "https://localhost:8080/v1/establishments"

    constructor(private http: HttpClient){}

    createEmpresa(empresa: Empresa): Observable<Empresa>{
        return this.http.post<Empresa>(`${this.baseUrl}`, empresa);
    }

    getEmpresa():Observable<Empresa[]>{
        return this.http.get<Empresa[]>(`${this.baseUrl}`);
    }

    getProduct(id: number):Observable<Empresa>{
        return this.http.get<Empresa>(`${this.baseUrl}/${id}`);
    }

    deleteEmpresa(id:number){
        return this.http.delete<Empresa>(`${this.baseUrl}/${id}`);
    }

    putEmpresa(empresa: Empresa, id:number){
        return this.http.put(`${this.baseUrl}/${id}`,empresa)
    }


}