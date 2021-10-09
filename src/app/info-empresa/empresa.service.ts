import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Empresa } from "./empresa.model";

@Injectable()
export class EmpresaService{

    baseUrl = "https://teste-api-delivery-1-2.herokuapp.com/v1/establishments"

    constructor(private http: HttpClient){}

    createEmpresa(empresa: Empresa): Observable<Empresa>{
        return this.http.post<Empresa>(`${this.baseUrl}`, empresa);
    }

    getEmpresa():Observable<Empresa[]>{
        return this.http.get<Empresa[]>(`${this.baseUrl}`);
    }

    getEmpresaById():Observable<Empresa>{
        return this.http.get<Empresa>(`${this.baseUrl}/1`);
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

    postImage(file: FormData){
        return this.http.post<File>(`https://teste-api-delivery-1-2.herokuapp.com/v1/amazons3/upload/establishment/1`, file);
    }


}