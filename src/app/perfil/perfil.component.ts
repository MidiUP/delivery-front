import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { authService } from '../auth/auth.service/auth.service';
import { Address } from '../enderecos/address.model';
import { addressService } from '../enderecos/address.service';
import { Bairro } from '../novo-bairro/bairro.model';
import { bairroService } from '../novo-bairro/bairro.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { DialogDeleteEnderecoComponent } from './dialog-delete-endereco/dialog-delete-endereco.component';

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
    'password': ['', [Validators.minLength(3)]],
    'confirmationPassword': ['', [Validators.minLength(3)]],
    'newPassword': ['', [Validators.minLength(3)]]
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
  newAddress: Address = new Address("", { name: "", deliveryTime: "", value: 0, id: 0, isEnable: true }, "", "", "", "", this.userAddress, 0);
  newAddress2: Address = new Address("", { name: "", deliveryTime: "", value: 0, id: 0, isEnable: true }, "", "", "", "", this.userAddress, 0);
  newAddress3: Address = new Address("", { name: "", deliveryTime: "", value: 0, id: 0, isEnable: true }, "", "", "", "", this.userAddress, 0);
  bairros: Bairro[] = [];
  enderecos: Address[] = [];





  constructor(private formBuilder: FormBuilder,
    private bairroService: bairroService,
    private userService: UserService,
    private addressService: addressService,
    private authService: authService,
    public dialog: MatDialog) { }

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
          this.userAddress.id = data.id;
        })
      )

  }

  newCampoEndereco() {
    if (this.campoEndereco > 2) {
      console.log("Máx de endereços é 3")
    } else {
      this.campoEndereco++;
    }
  }

  deleteCampoEndereco(endereco: Address) {
    if (endereco.id != 0) {
      this.openDialog(endereco);
    }

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

    if (this.enderecos.length === 1) {
      this.addressService.putAddress(this.newAddress, this.enderecos[0].id)
        .subscribe(
          (res => console.log("endereco 1 alterado")),
          (err => {
            console.log(err)
            console.log(this.newAddress)
          })
        )

      if (this.novoEnderecoForm2.valid) {
        this.addressService.createAddress(this.newAddress2)
          .subscribe(
            (res => console.log("endereco 2 cadastrado")),
            (err => console.log(err))
          )
      }

      if (this.novoEnderecoForm3.valid) {
        this.addressService.createAddress(this.newAddress2)
          .subscribe(
            (res => console.log("endereco 3 cadastrado")),
            (err => console.log(err))
          )
      }




    } else if (this.enderecos.length === 2) {
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

      if (this.novoEnderecoForm3.valid) {
        this.addressService.createAddress(this.newAddress3)
          .subscribe(
            (res => console.log("endereco 3 cadastrado")),
            (err => console.log(err))
          )
      }


    } else if (this.enderecos.length === 3) {
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

    window.location.reload();

  }

  getEnderecos(user: User) {
    this.addressService.findAddressByUser(user)
      .subscribe(
        (data => {
          this.enderecos = data;
          console.log(data)
          if (data.length == 1) {
            this.newAddress = data[0];
            this.newAddress.userRestaurant = this.userAddress;
            this.campoEndereco = 1;
          }
          if (data.length == 2) {
            this.newAddress = data[0];
            this.newAddress.userRestaurant = this.userAddress;
            this.newAddress2 = data[1];
            this.newAddress2.userRestaurant = this.userAddress;
            this.campoEndereco = 2;
          }
          if (data.length == 3) {
            this.newAddress = data[0];
            this.newAddress.userRestaurant = this.userAddress;
            this.newAddress2 = data[1];
            this.newAddress2.userRestaurant = this.userAddress;
            this.newAddress3 = data[2];
            this.newAddress3.userRestaurant = this.userAddress;
            this.campoEndereco = 3;
          }
        })
      );
  }

  openDialog(endereco: Address): void {
    const dialogRef = this.dialog.open(DialogDeleteEnderecoComponent, {
      data: { enderecoId: endereco.id }
    });
  }

  contentAddress(bairro: Bairro): string{
    if(bairro.name === ''){
      return "Selecione seu Bairro"
    }else {
      return bairro.name;
    }
  }
}