import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/user/adicionar-usuario/adicionar-endereco/address.model';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-adicionar-usuario-form',
  templateUrl: './adicionar-usuario-form.component.html',
  styleUrls: ['./adicionar-usuario-form.component.css']
})
export class AdicionarUsuarioFormComponent implements OnInit {

  @Output() openPanelAddress: boolean = false;
  users: User[] = [];
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  usuario: User = new User("", "", "", "", "", "", new Address("", "", "", "", "", ""), undefined);

  address:Address;

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService) {    
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

    this.getUsersList();
    console.log(this.users);
    
  }

  salvarUsuario(usuario: User){
    usuario.address = this.address;
    this.userService.createUser(usuario)
      .subscribe(
        data=>
          console.log(data),
        error =>
          console.log(error)
      );
  }

  getUsersList(): void{
    this.userService.getUsers()
      .subscribe(
        data => {
          this.users = data
          console.log(this.users)
        }
      )
  }

  openPanelToAddAddress(){
    this.openPanelAddress = !this.openPanelAddress;
  }
  
  cancel(){
    this.router.navigate(['/']);
  }

  onChangeOpenPanelAddress(evento: any):void{
    this.openPanelAddress = evento;
  }
  
  addressValue(evento: any): void {
    this.usuario.address = evento;
    this.onChangeOpenPanelAddress(false);
  }

}
