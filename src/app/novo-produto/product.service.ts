import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "./product.model";

@Injectable()
export class ProductService{

    baseUrl = "http://localhost:8080/v1/products"

    constructor(private http: HttpClient){}

    createProduct(product: Product): Observable<Product>{
        return this.http.post<Product>(`${this.baseUrl}`, product);
    }

    getProducts():Observable<Product[]>{
        return this.http.get<Product[]>(`${this.baseUrl}`);
    }

    getProduct(id: number):Observable<Product>{
        return this.http.get<Product>(`${this.baseUrl}/${id}`);
    }

    deleteProduct(id:number): Observable<Product>{
        return this.http.get<Product>(`${this.baseUrl}/${id}`);
    }


}