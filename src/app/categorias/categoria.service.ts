import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Properties } from "../Properties";
import { Categoria } from "./categoria.model";

@Injectable()
export class categoriaService{
    
    baseUrl = "https://api-delivery-v1-4.herokuapp.com/v1/categories"

    constructor(private http: HttpClient){}

    createCategory(categoria: Categoria): Observable<Categoria>{
        return this.http.post<Categoria>(`${this.baseUrl}`, categoria);
    }

    getCategories():Observable<Categoria[]>{
        return this.http.get<Categoria[]>(`${this.baseUrl}`);
    }

    getCategory(id: number):Observable<Categoria>{
        return this.http.get<Categoria>(`${this.baseUrl}/${id}`);
    }

    deleteCategory(id:number){
        return this.http.delete<Categoria>(`${this.baseUrl}/${id}`);
    }

    putCategory(categoria: Categoria, id:number){
        return this.http.put(`${this.baseUrl}/${id}`,categoria)
    }

}