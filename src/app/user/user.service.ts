import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RespostaModel, User } from "./user.model";

@Injectable()
export class UserService {

    baseUrl = "http://89.40.5.41:8081/users";

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

    putUser(user: User, id:number): Observable<RespostaModel>{
        return this.http.put<RespostaModel>(`${this.baseUrl}/${id}`,user)
    }

    findByUsername(username:string): Observable<User>{
        return this.http.get<User>(`${this.baseUrl}/find?username=${username}`);
    }

    cpfCheck(cpf: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.baseUrl}/check-cpf?cpf=${cpf}`);
    }

    phoneCheck(phone: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.baseUrl}/check-phone?phone=${phone}`);
    }

    emailCheck(email: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.baseUrl}/check-email?email=${email}`);
    }

    recoveryPassword(id: number, newPassword: string): Observable<User>{
        return this.http.post<User>(`${this.baseUrl}/changePassword/${id}`, {newPassword: newPassword});
    }

}