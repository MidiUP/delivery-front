import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaSuccesComponent } from 'src/app/alerta-succes/alerta-succes.component';
import { DialogData } from 'src/app/editar-produto/dialog-delete/dialog-delete.component';
import { SenhaDiferenteRepetirComponent } from 'src/app/snack-bars/senha-diferente-repetir/senha-diferente-repetir.component';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-dialog-redefinir-senha',
  templateUrl: './dialog-redefinir-senha.component.html',
  styleUrls: ['./dialog-redefinir-senha.component.css']
})
export class DialogRedefinirSenhaComponent implements OnInit {

  hide = true;
  senha: string = "";
  repetirSenha: string = "";

  redefinirSenhaForm: FormGroup = this.formBuilder.group({
    'senha': ['', [Validators.required, Validators.minLength(8)]],
    'repetirSenha': ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(public dialogRef: MatDialogRef<DialogRedefinirSenhaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private _snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private userService: UserService) { }

  ngOnInit(): void {
  }

  salvar(){
    if(this.senha === this.repetirSenha){
      this.userService.recoveryPassword(this.data.id, this.senha)
        .subscribe(
          (res => {
            this.openSnackBarSuccess();
          }),
          (err => {
            console.log(err);
          })
        )
    }else {
      this.openSnackBarError();
    }
  }

  openSnackBarError() {
    this._snackBar.openFromComponent(SenhaDiferenteRepetirComponent, {
      duration: 5000,
    });
  }

  openSnackBarSuccess() {
    this._snackBar.openFromComponent(AlertaSuccesComponent, {
      duration: 5000,
    });
  }

}
