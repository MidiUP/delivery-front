import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Properties } from "../Properties";
import { User } from "../user/user.model";
import { Address } from "./address.model";



@Injectable()
export class addressService{
    
    baseUrl = `${environment.url}/v1/addresses`

    constructor(private http: HttpClient){}

    createAddress(address: Address): Observable<Address>{
        return this.http.post<Address>(`${this.baseUrl}`, address);
    }

    getAddress():Observable<Address[]>{
        return this.http.get<Address[]>(`${this.baseUrl}`);
    }

    getAddressId(id: number):Observable<Address>{
        return this.http.get<Address>(`${this.baseUrl}/${id}`);
    }

    deleteAddress(id:number){
        return this.http.delete<Address>(`${this.baseUrl}/${id}`);
    }

    putAddress(address: Address, id:number){
        return this.http.put(`${this.baseUrl}/${id}`,address)
    }

    findAddressByUser(user: User){
        return this.http.get<Address[]>(`${this.baseUrl}/user/${user.id}`)
    }

}