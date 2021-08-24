import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authService } from '../auth/auth.service/auth.service';
import { Address } from '../enderecos/address.model';
import { addressService } from '../enderecos/address.service';
import { Bairro } from '../novo-bairro/bairro.model';
import { bairroService } from '../novo-bairro/bairro.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  hide = true;
  campoEndereco: number = 1;
  novoUsuarioForm: FormGroup = this.formBuilder.group({
    'name': ['', [Validators.required, Validators.minLength(3)]],
    'cpf': ['', [Validators.required, Validators.minLength(3)]],
    'rg': ['', [Validators.required, Validators.minLength(3)]],
    'email': ['', [Validators.required, Validators.email]],
    'phone': ['', [Validators.required, Validators.minLength(3)]],
    'username': ['', [Validators.required, Validators.minLength(3)]],
    'password': ['', [Validators.required, Validators.minLength(3)]],
    'confirmationPassword': ['', [Validators.required, Validators.minLength(3)]]
  });

  novoEnderecoForm: FormGroup = this.formBuilder.group({
    'street': ['', [Validators.required, Validators.minLength(3)]],
    'number': ['', [Validators.required, Validators.minLength(3)]],
    'complement': ['', [Validators.required, Validators.minLength(3)]],
    'cep': ['', [Validators.required, Validators.minLength(3)]],
    'neighborhood': ['', [Validators.required, Validators.minLength(3)]],
    'city': ['', [Validators.required, Validators.minLength(3)]]
  });

  novoEnderecoForm2: FormGroup = this.formBuilder.group({
    'street': ['', [Validators.required, Validators.minLength(3)]],
    'number': ['', [Validators.required, Validators.minLength(3)]],
    'complement': ['', [Validators.required, Validators.minLength(3)]],
    'cep': ['', [Validators.required, Validators.minLength(3)]],
    'neighborhood': ['', [Validators.required, Validators.minLength(3)]],
    'city': ['', [Validators.required, Validators.minLength(3)]]
  });

  novoEnderecoForm3: FormGroup = this.formBuilder.group({
    'street': ['', [Validators.required, Validators.minLength(3)]],
    'number': ['', [Validators.required, Validators.minLength(3)]],
    'complement': ['', [Validators.required, Validators.minLength(3)]],
    'cep': ['', [Validators.required, Validators.minLength(3)]],
    'neighborhood': ['', [Validators.required, Validators.minLength(3)]],
    'city': ['', [Validators.required, Validators.minLength(3)]]
  });

  edit: boolean = false;
  newUser: User = new User("", "", "", "", "", "", "", 0);
  userAddress: User = new User("", "", "", "", "", "", "", 3);
  newAddress: Address = new Address("", { name: "", deliveryTime: "", value: 0, id: 0 }, "", "", "", "", this.userAddress, 0);
  newAddress2: Address = new Address("", { name: "", deliveryTime: "", value: 0, id: 0 }, "", "", "", "", this.userAddress, 0);
  newAddress3: Address = new Address("", { name: "", deliveryTime: "", value: 0, id: 0 }, "", "", "", "", this.userAddress, 0);
  bairros: Bairro[] = [];
  enderecos: Address[] = [];





  constructor(private formBuilder: FormBuilder,
    private bairroService: bairroService,
    private userService: UserService,
    private addressService: addressService,
    private authService: authService) { }

  ngOnInit(): void {
    this.getBairros();
    this.userService.findByUsername(this.authService.getUsername())
      .subscribe(
        (data => {
          this.newUser.id = data.id;
          this.newUser.cpf = data.cpf;
          this.newUser.email = data.email;
          this.newUser.name = data.name;
          this.newUser.password = data.password;
          this.newUser.phone = data.phone;
          this.newUser.rg = data.rg;
          this.newUser.username = data.username;
          // this.newUser.password = "***";
          this.getEnderecos(this.newUser);
        })
      )

  }

  newCampoEndereco() {
    if (this.campoEndereco > 2) {
      console.log("Máx de endereços é 3")
    } else {
      this.campoEndereco++;
    }
    console.log(this.campoEndereco)
  }

  deleteCampoEndereco(endereco: number) {
    if (this.campoEndereco > 1)
      this.campoEndereco--;

  }


  getBairros() {
    this.bairroService.getBairros()
      .subscribe(
        (data => {
          this.bairros = data;
        })
      );
  }

  formsValid(): boolean {
    if (this.campoEndereco < 2) {
      if (this.novoUsuarioForm.valid === true && this.novoEnderecoForm.valid === true) {
        return true;
      } else return false;
    }

    if (this.campoEndereco === 2) {
      if (this.novoUsuarioForm.valid === true && this.novoEnderecoForm.valid === true && this.novoEnderecoForm2.valid === true) {
        return true;
      } else return false;
    }

    if (this.campoEndereco === 3) {
      if (this.novoUsuarioForm.valid === true && this.novoEnderecoForm.valid === true && this.novoEnderecoForm2.valid === true && this.novoEnderecoForm3.valid === true) {
        return true;
      } else return false;
    }

    return false;
  }

  cadastroEndereco(address: Address) {
    this.addressService.createAddress(address)
      .subscribe(
        (res) => {
          console.log("endereco cadastrado");
        },
        (err) => {
          console.log(err);
        })
  }

  editEndereco(address: Address) {
    this.addressService.putAddress(address, address.id)
      .subscribe(
        (res) => {
          console.log("endereco cadastrado");
        },
        (err) => {
          console.log(err);
        })
  }

  onSubmit() {
    this.userService.putUser(this.newUser, this.newUser.id)
      .subscribe(
        (res) => {
          console.log("usuario alterado");
        },
        (err) => {
          console.log(err);
          console.log(this.newUser)
        })
    
    if(this.enderecos.length < 2 ){
      this.addressService.putAddress(this.newAddress, this.enderecos[0].id)
        .subscribe(
          (res => console.log("endereco 1 alterado")),
          (err => {
            console.log(err)
            console.log(this.newAddress)
          })
        )
    }else if (this.enderecos.length === 2){
      this.addressService.putAddress(this.newAddress, this.enderecos[0].id)
        .subscribe(
          (res => console.log("endereco 1 alterado")),
          (err => {
            console.log(err)
            console.log(this.newAddress)
          })
        )

        this.addressService.putAddress(this.newAddress2, this.enderecos[1].id)
        .subscribe(
          (res => console.log("endereco 2 alterado")),
          (err => {
            console.log(err)
            console.log(this.newAddress)
          })
        )
    } else if (this.enderecos.length === 3){
      this.addressService.putAddress(this.newAddress, this.enderecos[0].id)
        .subscribe(
          (res => console.log("endereco 1 alterado")),
          (err => {
            console.log(err)
            console.log(this.newAddress)
          })
        )

        this.addressService.putAddress(this.newAddress2, this.enderecos[1].id)
        .subscribe(
          (res => console.log("endereco 2 alterado")),
          (err => console.log(err))
        )

        this.addressService.putAddress(this.newAddress3, this.enderecos[2].id)
        .subscribe(
          (res => console.log("endereco 3 alterado")),
          (err => console.log(err))
        )
    }

 
  }

  getEnderecos(user: User) {
    this.addressService.findAddressByUser(user)
      .subscribe(
        (data => {
          this.enderecos = data;
          if (this.enderecos.length == 1) {
            this.newAddress = this.enderecos[0];
            this.newAddress.userRestaurant = this.newUser;
            this.campoEndereco = 1;
          }
          if (this.enderecos.length == 2) {
            this.newAddress = this.enderecos[0];
            this.newAddress.userRestaurant = this.newUser;
            this.newAddress2 = this.enderecos[1];
            this.newAddress2.userRestaurant = this.newUser;
            this.campoEndereco = 2;
          }
          if (this.enderecos.length == 3) {
            this.newAddress = this.enderecos[0];
            this.newAddress.userRestaurant = this.newUser;
            this.newAddress2 = this.enderecos[1];
            this.newAddress2.userRestaurant = this.newUser;
            this.newAddress3 = this.enderecos[2];
            this.newAddress3.userRestaurant = this.newUser;
            this.campoEndereco = 3;
          }
        })
      );
  }

}