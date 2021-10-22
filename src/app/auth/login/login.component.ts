import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FalhaLoginComponent } from 'src/app/snack-bars/falha-login/falha-login.component';
import { authService } from '../auth.service/auth.service';
import { UserLogin } from './userLogin.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  esqueciSenha: boolean = false;
  emailRedefinirSenha: string;
  hide = true;
  user: UserLogin = new UserLogin("","")
  loginForm: FormGroup = this.formBuilder.group({
    'username': ['', [Validators.required, Validators.minLength(3)]],
    'password': ['', [Validators.required, Validators.minLength(3)]]
  })

  esqueciSenhaForm: FormGroup = this.formBuilder.group({
    'email': ['', [Validators.required, Validators.email]]
  })

  constructor(private formBuilder: FormBuilder,
              private authService: authService,
              private _snackBar: MatSnackBar,
              private http: HttpClient) { }

  ngOnInit(): void {

  }

  onSubmit(){
    this.authService.login(this.user)
      .subscribe(
        (res => {
          
      }
        ),
        (err => {
          this.openSnackBarFalhaLogin();
        }
        )
      )
  }

  openSnackBarFalhaLogin() {
    this._snackBar.openFromComponent(FalhaLoginComponent, {
      duration: 5000,
    });
  }

  esqueciMinhaSenha(){
    this.esqueciSenha = true;
  }

  redefinirSenha(){
    this.requisicaoRedefinirSenha()
      .subscribe(
        (res => {}),
        (err => {console.log(err)})
      )
  }

  requisicaoRedefinirSenha(): Observable<any>{
    return this.http.post<any>(`http://localhost:8080/users/recover?recoveryPassword=${this.emailRedefinirSenha}`,"");
  }

  

}
