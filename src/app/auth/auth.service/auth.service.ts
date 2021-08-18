import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "src/app/user/user.model";
import { UserService } from "src/app/user/user.service";
import { UserLogin } from "../login/userLogin.model";
import { Token } from "./token.model";

@Injectable()
export class authService{
    
    baseUrl = "http://localhost:8080"

    private user: User = new User ("","","","","","","",0);
    private username:string;
    private loggedIn: boolean = false;
    private subjUser$: BehaviorSubject<User> = new BehaviorSubject(this.user);


    constructor(private http: HttpClient,
                private userService: UserService){}

    login(userLogin: UserLogin):Observable<any>{
        return this.http
            .post<any>(`${this.baseUrl}/login`,userLogin)
            .pipe(
                tap((token: Token) => {
                    localStorage.setItem('token', token.access_token);
                    this.loggedIn=true;
                    this.username = userLogin.username
                })
            )
            

    }

    isAuthenticated(): boolean{
        return this.loggedIn;
    }

    getUser(): User {
        return this.subjUser$.value;
    }

    getUsername(): string {
        return this.username;
    }

    // findUser(username: string): User{
    //     let user: User = new User("","","","","","","");
    //     this.userService.findByUsername(username)
    //         .subscribe(
    //             (data => user = data)
    //         );
    //     return user;
    // }



}