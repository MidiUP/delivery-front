import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "./product.model";

@Injectable()
export class ProductService{

    baseUrl = "https://teste-api-delivery-1-2.herokuapp.com/v1/products"

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

    deleteProduct(id:number){
        return this.http.delete<Product>(`${this.baseUrl}/${id}`);
    }

    putProduct(product: Product, id:number){
        return this.http.put(`${this.baseUrl}/${id}`, product)
    }

    searchProduct(category: string, productName: string){
        return this.http.get<Product[]>(`${this.baseUrl}/filter?category=${category}&productName=${productName}`);
    }

    postImage(file: FormData, id: number){
        return this.http.post<File>(`https://teste-api-delivery-1-2.herokuapp.com/v1/amazons3/upload/product/${id}`, file);
    }


}