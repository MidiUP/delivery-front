import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaErrorComponent } from 'src/app/alerta-error/alerta-error.component';
import { AlertaSuccesComponent } from 'src/app/alerta-succes/alerta-succes.component';
import { Adicional } from 'src/app/novo-produto/adicional.model';
import { AdicionalService } from '../adicional.service';

@Component({
  selector: 'app-dialog-editar-adicional',
  templateUrl: './dialog-editar-adicional.component.html',
  styleUrls: ['./dialog-editar-adicional.component.css']
})
export class DialogEditarAdicionalComponent implements OnInit {

  novoAdicionalForm: FormGroup = this.formBuilder.group({
    'name': ['', [Validators.required, Validators.minLength(3)]],
    'price': ['', [Validators.required, Validators.min(1)]],
    'description': ['', [Validators.required, Validators.minLength(3)]]
  });

  newAdicional: Adicional = new Adicional("", 0, "", 10, 0, 0, 0);

  constructor(private adicionalService: AdicionalService, private formBuilder: FormBuilder, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public adicional: Adicional) { }

  ngOnInit(): void {
    this.newAdicional = this.adicional;
    this.newAdicional.quantity = 10;
  }

  salvarAdicional() {
    this.adicionalService.putAdicional(this.newAdicional, this.adicional.id)
      .subscribe(
        (res => {
          this.openSnackBarSuccess();
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
