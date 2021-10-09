import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "src/app/user/user.model";
import { UserLogin } from "../login/userLogin.model";
import { Token } from "./token.model";
import jwt_decode from 'jwt-decode';
import { Router } from "@angular/router";

@Injectable()
export class authService {

    baseUrl = "https://teste-api-delivery-1-2.herokuapp.com"

    private user: User = new User("", "", "", "", "", "", "", 0);
    private username: string;
    private subjUser$: BehaviorSubject<User> = new BehaviorSubject(this.user);


    constructor(private http: HttpClient,
        private router: Router) { }

    login(userLogin: UserLogin): Observable<any> {
        return this.http
            .post<any>(`${this.baseUrl}/login`, userLogin)
            .pipe(
                tap((token: Token) => {
                    localStorage.setItem('token', token.access_token);
                    this.username = userLogin.username;
                    this.router.navigate(['']);
                })
            )


    }

    isAuthenticated(): boolean {
        // return this.loggedIn;
        if (localStorage.getItem('token')) {
            let token: any = localStorage.getItem('token');
            if (this.getTokenValid(token) == true) {
                const decoded: any = jwt_decode(token);
                this.username = decoded.sub;
                return true;
            } else {
                localStorage.removeItem("token");
                return false;
            }
        } else {
            return false;
        }
    }

    getUser(): User {
        return this.subjUser$.value;
    }

    getUsername(): string {
        return this.username;
    }

    logout() {
        localStorage.removeItem('token');
        this.username = "";
    }

    getTokenValid(token: any): boolean {
        const decoded: any = jwt_decode(token);

        if (decoded.exp === undefined) {
            return false;
        }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);

        if (date.valueOf() > new Date().valueOf()) {
            return true;
        } else {
            return false;
        }
    }

    isAdmin(): boolean {
        if (localStorage.getItem('token')) {
            let token: any = localStorage.getItem('token');
            if (this.getTokenValid(token) == true) {
                const decoded: any = jwt_decode(token);
                console.log(decoded.roles);
                let roles: any[] = decoded.roles;
                let admin: boolean = false;
                roles.forEach(role => {
                    if (role === 'ADMIN') {
                        admin = true;
                    }
                })
                if(admin){
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }



}