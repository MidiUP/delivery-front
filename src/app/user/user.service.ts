import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user.model";

@Injectable()
export class UserService {

    baseUrl = "https://teste-api-delivery-1-2.herokuapp.com/users";

    constructor(private http: HttpClient){}

    createUser(user: User):Observable<User>{
        return this.http.post<User>(`${this.baseUrl}`, user);
    }

    getUsers():Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}`);
    }

    getUser(id: number): Observable<User>{
        return this.http.get<User>(`${this.baseUrl}/${id}`);
    }

    deleteUser(id: number): Observable<User> {
        return this.http.delete<User>(`${this.baseUrl}/${id}`);
    }

    putUser(user: User, id:number){
        return this.http.put(`${this.baseUrl}/${id}`,user)
    }

    findByUsername(username:string): Observable<User>{
        return this.http.get<User>(`${this.baseUrl}/find?username=${username}`);
    }

}