import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaErrorComponent } from '../alerta-error/alerta-error.component';
import { AlertaSuccesComponent } from '../alerta-succes/alerta-succes.component';
import { authService } from '../auth/auth.service/auth.service';
import { Address } from '../enderecos/address.model';
import { addressService } from '../enderecos/address.service';
import { Bairro } from '../novo-bairro/bairro.model';
import { bairroService } from '../novo-bairro/bairro.service';
import { CpfCadastradoComponent } from '../snack-bars/cpf-cadastrado/cpf-cadastrado.component';
import { EmailCadastradoComponent } from '../snack-bars/email-cadastrado/email-cadastrado.component';
import { NumeroCadastradoComponent } from '../snack-bars/numero-cadastrado/numero-cadastrado.component';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { DialogDeleteEnderecoComponent } from './dialog-delete-endereco/dialog-delete-endereco.component';
import { DialogRedefinirSenhaComponent } from './dialog-redefinir-senha/dialog-redefinir-senha.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  hide = true;
  campoEndereco: number = 1;
  novoUsuarioForm: FormGroup = this.formBuilder.group({
    'name': ['', [Validators.required, Validators.minLength(2)]],
    'cpf': ['', [this.validarCpf]],
    'email': ['', [Validators.required, Validators.email]],
    'phone': ['', [Validators.required, Validators.minLength(15)]],
    // 'username': ['', [Validators.required, Validators.minLength(3)]]
    // 'password': ['', [Validators.minLength(3)]],
    // 'confirmationPassword': ['', [Validators.minLength(3)]],
    // 'newPassword': ['', [Validators.minLength(3)]]
  });

  validarCpf(input: FormControl) {
    const cpf = input.value.replace(/\D/g, '');

    if (cpf == null) {
      return { cpfInvalid: true };
    }
    if (cpf.length != 11) {
      return { cpfInvalid: true };
    }
    if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
      return { cpfInvalid: true };
    }
    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
      caracter = cpfAux.charAt(i);
      if (numeros.search(caracter) == -1) {
        return { cpfInvalid: true };
      }
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
      digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
      caracter = cpfAux.charAt(i);
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
      digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf != cpfAux) {
      return { cpfInvalid: true };
    }
    else {
      return null;
    }
  }

  novoEnderecoForm: FormGroup = this.formBuilder.group({
    'street': ['', [Validators.required, Validators.minLength(3)]],
    'number': ['', [Validators.required, Validators.minLength(1)]],
    'complement': ['', [Validators.required, Validators.minLength(3)]],
    'cep': ['', [Validators.required, Validators.minLength(3)]],
    'neighborhood': ['', [Validators.required, Validators.minLength(3)]],
    'city': ['', [Validators.required, Validators.minLength(3)]]
  });

  novoEnderecoForm2: FormGroup = this.formBuilder.group({
    'street': ['', [Validators.required, Validators.minLength(3)]],
    'number': ['', [Validators.required, Validators.minLength(1)]],
    'complement': ['', [Validators.required, Validators.minLength(3)]],
    'cep': ['', [Validators.required, Validators.minLength(3)]],
    'neighborhood': ['', [Validators.required, Validators.minLength(3)]],
    'city': ['', [Validators.required, Validators.minLength(3)]]
  });

  novoEnderecoForm3: FormGroup = this.formBuilder.group({
    'street': ['', [Validators.required, Validators.minLength(3)]],
    'number': ['', [Validators.required, Validators.minLength(1)]],
    'complement': ['', [Validators.required, Validators.minLength(3)]],
    'cep': ['', [Validators.required, Validators.minLength(3)]],
    'neighborhood': ['', [Validators.required, Validators.minLength(3)]],
    'city': ['', [Validators.required, Validators.minLength(3)]]
  });

  edit: boolean = false;
  newUser: User = new User("", "", "", "", "", 0);
  userAddress: User = new User("", "", "", "", "", 3);
  newAddress: Address = new Address("", { name: "", deliveryTime: "", value: 0, id: 0, isEnable: true }, "", "", "", "", this.userAddress, 0);
  newAddress2: Address = new Address("", { name: "", deliveryTime: "", value: 0, id: 0, isEnable: true }, "", "", "", "", this.userAddress, 0);
  newAddress3: Address = new Address("", { name: "", deliveryTime: "", value: 0, id: 0, isEnable: true }, "", "", "", "", this.userAddress, 0);
  bairros: Bairro[] = [];
  enderecos: Address[] = [];
  
  cpfBase: string;
  emailBase: string;
  telefoneBase: string;


  constructor(private formBuilder: FormBuilder,
    private bairroService: bairroService,
    private userService: UserService,
    private addressService: addressService,
    private authService: authService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

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
          // this.newUser.password = "***";
          this.getEnderecos(this.newUser);
          this.userAddress.id = data.id;
          this.cpfBase = data.cpf;
          this.emailBase = data.email;
          this.telefoneBase = data.phone;
        })
      )

  }

  newCampoEndereco() {
    if (this.campoEndereco > 2) {

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
      if (this.novoUsuarioForm.valid === true && this.novoEnderecoForm.valid === true && this.newAddress.neighborhood.id!=0) {
        return true;
      } else return false;
    }

    if (this.campoEndereco === 2) {
      if (this.novoUsuarioForm.valid === true && this.novoEnderecoForm.valid === true && this.novoEnderecoForm2.valid === true && this.newAddress.neighborhood.id!=0 && this.newAddress2.neighborhood.id!=0) {
        return true;
      } else return false;
    }

    if (this.campoEndereco === 3) {
      if (this.novoUsuarioForm.valid === true && this.novoEnderecoForm.valid === true && this.novoEnderecoForm2.valid === true && this.novoEnderecoForm3.valid === true && this.newAddress.neighborhood.id!=0 && this.newAddress2.neighborhood.id!=0 && this.newAddress3.neighborhood.id!=0) {
        return true;
      } else return false;
    }

    return false;
  }

  cadastroEndereco(address: Address) {
    this.addressService.createAddress(address)
      .subscribe(
        (res) => {
        },
        (err) => {
          console.log(err);
        })
  }

  editEndereco(address: Address) {
    this.addressService.putAddress(address, address.id)
      .subscribe(
        (res) => {
        },
        (err) => {
          console.log(err);
        })
  }

  onSubmit() {

    this.newUser.cpf = this.newUser.cpf.replace(/\D/g, '');
    this.newUser.phone = this.newUser.phone.replace(/\D/g, '');
    this.userService.putUser(this.newUser, this.newUser.id)
      .subscribe(
        (res) => {
          if(res.cpfExiste){
            this.openSnackBarCpfExists();
          }else if(res.emailExiste){
            this.openSnackBarEmailExists()
          }else if(res.phoneExiste){
            this.openSnackBarTelefoneExists();
          }else{
            this.openSnackBarSuccess();
          }
        },
        (err) => {
          this.openSnackBarError();
          console.log(err);
        })

    if (this.enderecos.length === 1) {
      this.addressService.putAddress(this.newAddress, this.enderecos[0].id)
        .subscribe(
          (res => console.log("endereco 1 alterado")),
          (err => {
            console.log(err)
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
          })
        )

      this.addressService.putAddress(this.newAddress2, this.enderecos[1].id)
        .subscribe(
          (res => console.log("endereco 2 alterado")),
          (err => {
            console.log(err)
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

    // window.location.reload();

  }

  getEnderecos(user: User) {
    this.addressService.findAddressByUser(user)
      .subscribe(
        (data => {
          this.enderecos = data;
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

  openDialogRedefinirSenha(): void {
    const dialogRef = this.dialog.open(DialogRedefinirSenhaComponent, {
      data: { id: this.newUser.id}
    });
  }

  contentAddress(bairro: Bairro): string{
    if(bairro.name === ''){
      return "Selecione seu Bairro"
    }else {
      return bairro.name;
    }
  }

  openSnackBarCpfExists() {
    this._snackBar.openFromComponent(CpfCadastradoComponent, {
      duration: 5 * 1000,
    });
  }

  openSnackBarTelefoneExists() {
    this._snackBar.openFromComponent(NumeroCadastradoComponent, {
      duration: 5 * 1000,
    });
  }

  openSnackBarEmailExists() {
    this._snackBar.openFromComponent(EmailCadastradoComponent, {
      duration: 5 * 1000,
    });
  }

  openSnackBarError() {
    this._snackBar.openFromComponent(AlertaErrorComponent, {
      duration: 5 * 1000,
    });
  }

  openSnackBarSuccess() {
    this._snackBar.openFromComponent(AlertaSuccesComponent, {
      duration: 5 * 1000,
    });
  }


}