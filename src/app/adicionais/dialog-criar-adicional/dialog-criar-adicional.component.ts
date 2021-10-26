import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaErrorComponent } from 'src/app/alerta-error/alerta-error.component';
import { AlertaSuccesComponent } from 'src/app/alerta-succes/alerta-succes.component';
import { Adicional } from 'src/app/novo-produto/adicional.model';
import { AdicionalService } from '../adicional.service';

@Component({
  selector: 'app-dialog-criar-adicional',
  templateUrl: './dialog-criar-adicional.component.html',
  styleUrls: ['./dialog-criar-adicional.component.css']
})
export class DialogCriarAdicionalComponent implements OnInit {

  novoAdicionalForm: FormGroup = this.formBuilder.group({
    'name': ['', [Validators.required, Validators.minLength(3)]],
    'price': ['', [Validators.required, Validators.min(1)]],
    'description': ['', [Validators.required, Validators.minLength(3)]]
  });

  newAdicional: Adicional = new Adicional("", 0, "", 10, 0, 0, 0);

  constructor(public dialogRef: MatDialogRef<DialogCriarAdicionalComponent>,private adicionalService: AdicionalService, private formBuilder: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  salvarAdicional() {
    this.adicionalService.createAdicional(this.newAdicional)
      .subscribe(
        (res => {
          this.openSnackBarSuccess();
          this.dialogRef.close();
        }),
        (err => {
          this.openSnackBarError();
          console.log(err);
          
        })
      )
  }

  openSnackBarSuccess() {
    this._snackBar.openFromComponent(AlertaSuccesComponent, {
      duration: 5000,
    });
  }

  openSnackBarError() {
    this._snackBar.openFromComponent(AlertaErrorComponent, {
      duration: 5000,
    });
  }

}
