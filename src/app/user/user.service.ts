import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user.model";

@Injectable()
export class UserService {

    baseUrl = "http://localhost:8080/users";

    constructor(private http: HttpClient){}

    createUser(user: User):Observable<User>{
        return this.http.post<User>(`${this.baseUrl}`, user);
    }

    getUsers():Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}`);
    }

    getUser(id: string): Observable<User>{
        return this.http.get<User>(`${this.baseUrl}/${id}`);
    }

    deleteUser(id: string): Observable<User> {
        return this.http.delete<User>(`${this.baseUrl}/${id}`);
    }

}