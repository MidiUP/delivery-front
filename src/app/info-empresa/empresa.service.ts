import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Properties } from "../Properties";
import { Empresa } from "./empresa.model";

@Injectable()
export class EmpresaService{

    baseUrl = "http://localhost:8080/v1/establishments"

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
        return this.http.post<File>(`${Properties}/v1/amazons3/upload/establishment/1`, file);
    }


}