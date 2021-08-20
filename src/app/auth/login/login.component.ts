import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { authService } from '../auth.service/auth.service';
import { UserLogin } from './userLogin.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  user: UserLogin = new UserLogin("","")
  loginForm: FormGroup = this.formBuilder.group({
    'username': ['', [Validators.required, Validators.minLength(3)]],
    'password': ['', [Validators.required, Validators.minLength(3)]]
  })

  constructor(private formBuilder: FormBuilder,
              private authService: authService,
              private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(){
    this.authService.login(this.user)
      .subscribe(
        (res => {
          console.log("logou");
      }
        ),
        (err => {
          console.log("usuário ou senha inválida");
        }
        )
      )
  }

  

}
