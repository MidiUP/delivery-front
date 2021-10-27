import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { authService } from 'src/app/auth/auth.service/auth.service';
import { Address } from 'src/app/enderecos/address.model';
import { addressService } from 'src/app/enderecos/address.service';
import { Bairro } from 'src/app/novo-bairro/bairro.model';
import { bairroService } from 'src/app/novo-bairro/bairro.service';
import { CpfCadastradoComponent } from 'src/app/snack-bars/cpf-cadastrado/cpf-cadastrado.component';
import { NumeroCadastradoComponent } from 'src/app/snack-bars/numero-cadastrado/numero-cadastrado.component';
import { SenhaDiferenteRepetirComponent } from 'src/app/snack-bars/senha-diferente-repetir/senha-diferente-repetir.component';
import { User } from '../user.model';
import { UserService } from '../user.service';


@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {
  confirmacaoSenha: string;
  hide = true;
  campoEndereco: number = 1;
  novoUsuarioForm: FormGroup = this.formBuilder.group({
    'name': ['', [Validators.required, Validators.minLength(3)]],
    'cpf': ['', [this.validarCpf]],
    'rg': ['', []],
    'email': ['', [Validators.required, Validators.email]],
    'phone': ['', [Validators.required, Validators.minLength(11)]],
    'username': ['', []],
    'password': ['', [Validators.required, Validators.minLength(8)]],
    'confirmationPassword': ['', [Validators.required, Validators.minLength(8)]]
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
    'cep': ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    'neighborhood': ['', [Validators.required, Validators.minLength(3)]],
    'city': ['', [Validators.required, Validators.minLength(3)]]
  });

  novoEnderecoForm2: FormGroup = this.formBuilder.group({
    'street': ['', [Validators.required, Validators.minLength(3)]],
    'number': ['', [Validators.required, Validators.minLength(1)]],
    'complement': ['', [Validators.required, Validators.minLength(3)]],
    'cep': ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    'neighborhood': ['', [Validators.required, Validators.minLength(3)]],
    'city': ['', [Validators.required, Validators.minLength(3)]]
  });

  novoEnderecoForm3: FormGroup = this.formBuilder.group({
    'street': ['', [Validators.required, Validators.minLength(3)]],
    'number': ['', [Validators.required, Validators.minLength(1)]],
    'complement': ['', [Validators.required, Validators.minLength(3)]],
    'cep': ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    'neighborhood': ['', [Validators.required, Validators.minLength(3)]],
    'city': ['', [Validators.required, Validators.minLength(3)]]
  });

  newUser: User = new User("", "", "", "", "", 0);
  userAddress: User = new User("", "", "", "", "", 3);
  newAddress: Address = new Address("", { name: "", deliveryTime: "", value: 0, id: 0, isEnable: true }, "", "", "", "", this.userAddress, 0);
  newAddress2: Address = new Address("", { name: "", deliveryTime: "", value: 0, id: 0, isEnable: true }, "", "", "", "", this.userAddress, 0);
  newAddress3: Address = new Address("", { name: "", deliveryTime: "", value: 0, id: 0, isEnable: true }, "", "", "", "", this.userAddress, 0);
  bairros: Bairro[] = [];





  constructor(private formBuilder: FormBuilder,
    private bairroService: bairroService,
    private userService: UserService,
    private addressService: addressService,
    private authService: authService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getBairros();
  }



  newCampoEndereco() {
    if (this.campoEndereco > 2) {
      console.log("Máx de endereços é 3")
    } else {
      this.campoEndereco++;
    }
    console.log(this.campoEndereco)
  }

  deleteCampoEndereco() {
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
      if (this.novoUsuarioForm.valid === true && this.novoEnderecoForm.valid === true && this.newAddress.neighborhood.id !== 0) {
        return true;
      } else return false;
    }

    if (this.campoEndereco === 2) {
      if (this.novoUsuarioForm.valid === true && this.novoEnderecoForm.valid === true && this.novoEnderecoForm2.valid === true && this.newAddress.neighborhood.id !== 0 && this.newAddress2.neighborhood.id !== 0) {
        return true;
      } else return false;
    }

    if (this.campoEndereco === 3) {
      if (this.novoUsuarioForm.valid === true && this.novoEnderecoForm.valid === true && this.novoEnderecoForm2.valid === true && this.novoEnderecoForm3.valid === true && this.newAddress.neighborhood.id !== 0 && this.newAddress2.neighborhood.id !== 0 && this.newAddress3.neighborhood.id !== 0) {
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
          console.log(this.newUser)
        })
  }

  onSubmit() {

   if(this.newUser.password === this.confirmacaoSenha){
    this.userService.cpfCheck(this.newUser.cpf.replace(/\D/g, ''))
    .subscribe(
      data => {
        if (data) {
          this.openSnackBarCpfExists();

        } else {
          this.userService.phoneCheck(this.newUser.phone.replace(/\D/g, ''))
            .subscribe(data => {
              if (data) {
                this.openSnackBarTelefoneExists();
              } else {
                this.newUser.cpf = this.newUser.cpf.replace(/\D/g, '');
                this.newUser.phone = this.newUser.phone.replace(/\D/g, '');
                this.userService.createUser(this.newUser)
                  .subscribe(
                    (res) => {
                      console.log("usuario cadastrado");
                      this.userService.findByUsername(this.newUser.phone)
                        .subscribe(
                          (data => {
                            this.userService.findByUsername(this.newUser.phone)
                              .subscribe(
                                (data => {
                                  this.userAddress.id = data.id;
                                  this.cadastroEndereco(this.newAddress);
                                  if (this.campoEndereco === 2) {
                                    this.cadastroEndereco(this.newAddress2);
                                  }
                                  if (this.campoEndereco === 3) {
                                    this.cadastroEndereco(this.newAddress2);
                                    this.cadastroEndereco(this.newAddress3);
                                  }
                                  this.authService.login({ username: this.newUser.phone, password: this.newUser.password })
                                    .subscribe(
                                      (res => console.log("chamei login")),
                                      (err => console.log(err))
                                    );
                                  console.log("cheguei")
                                }),
                                (err => console.log(err))
                              )
                          }),
                          (err) => {
                            console.log(err)
                          })
                    },
                    (err) => {
                      console.log(err);
                      console.log(this.newUser)
                    })


              }
            })
        }
      }
    )
   }else {
    this.openSnackBarPasswordDiferenteConfirmacao()
   }

  }

  openSnackBarPasswordDiferenteConfirmacao() {
    this._snackBar.openFromComponent(SenhaDiferenteRepetirComponent, {
      duration: 5 * 1000,
    });
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


  // onSubmit() {
  //   this.userService.createUser(this.newUser)
  //     .subscribe(
  //       (res) => {
  //         console.log("usuario cadastrado");
  //         this.userService.findByUsername(this.newUser.phone)
  //           .subscribe(
  //             (data => {
  //               this.userService.findByUsername(this.newUser.phone)
  //                 .subscribe(
  //                   (data => {
  //                     this.userAddress.id = data.id;
  //                     this.cadastroEndereco(this.newAddress);
  //                     if (this.campoEndereco === 2) {
  //                       this.cadastroEndereco(this.newAddress2);
  //                     }
  //                     if (this.campoEndereco === 3) {
  //                       this.cadastroEndereco(this.newAddress2);
  //                       this.cadastroEndereco(this.newAddress3);
  //                     }
  //                     this.authService.login({ username: this.newUser.phone, password: this.newUser.password })
  //                       .subscribe(
  //                         (res => console.log("chamei login")),
  //                         (err => console.log(err))
  //                       );
  //                     console.log("cheguei")
  //                   }),
  //                   (err => console.log(err))
  //                 )
  //             }),
  //             (err) => {
  //               console.log(err)
  //             })
  //       },
  //       (err) => {
  //         console.log(err);
  //         console.log(this.newUser)
  //       })
  // }

}
