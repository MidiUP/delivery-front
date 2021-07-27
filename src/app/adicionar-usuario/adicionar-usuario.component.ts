import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from '../adicionar-endereco/address.model';
import { User_ } from './user_.model';

@Component({
  selector: 'app-adicionar-usuario',
  templateUrl: './adicionar-usuario.component.html',
  styleUrls: ['./adicionar-usuario.component.css']
})
export class AdicionarUsuarioComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  usuario: User_;

  addresses:Address[] = [ 
    {street: "Arroz Carne da silva", neighborhood: "teste", number: "teste", complement: "teste", city: "Arroz Feijão batata e carne", cep: "teste"},
    {street: "teste", neighborhood: "teste", number: "teste", complement: "teste", city: "teste", cep: "teste"}
  ];

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router) {    
   }

  ngOnInit(): void {   
      this.userForm = new FormGroup({
      name: this.formBuilder.control('', [Validators.required, Validators.maxLength(100)]),
      email: this.formBuilder.control('', [Validators.required, Validators.maxLength(100), Validators.pattern(this.emailPattern)]),
      password: this.formBuilder.control('', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]),
      cpf: this.formBuilder.control('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      rg: this.formBuilder.control('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      phone: this.formBuilder.control('', [Validators.required, Validators.minLength(11)])
    }, {updateOn: 'change'});
  }

  salvarUsuario(usuario: User_){
    console.log(usuario);
  }

  cancel(){
    this.router.navigate(['/']);
  }

}
