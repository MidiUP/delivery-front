import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';
import { Address } from '../adicionar-endereco/address.model';

@Component({
  selector: 'app-adicionar-usuario',
  templateUrl: './adicionar-usuario.component.html',
  styleUrls: ['./adicionar-usuario.component.css']
})
export class AdicionarUsuarioComponent implements OnInit {

  constructor() {    
   }

  ngOnInit(): void {   

  }

}
