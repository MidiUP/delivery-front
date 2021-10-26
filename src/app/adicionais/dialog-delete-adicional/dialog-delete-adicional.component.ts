import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaErrorComponent } from 'src/app/alerta-error/alerta-error.component';
import { AlertaSuccesComponent } from 'src/app/alerta-succes/alerta-succes.component';
import { Adicional } from 'src/app/novo-produto/adicional.model';
import { AdicionalService } from '../adicional.service';

@Component({
  selector: 'app-dialog-delete-adicional',
  templateUrl: './dialog-delete-adicional.component.html',
  styleUrls: ['./dialog-delete-adicional.component.css']
})
export class DialogDeleteAdicionalComponent implements OnInit {

  constructor(private adicionalService: AdicionalService,public dialogRef: MatDialogRef<DialogDeleteAdicionalComponent>,  @Inject(MAT_DIALOG_DATA) public adicional: Adicional, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  deleteAdicional(){
    this.adicionalService.deleteAdicional(this.adicional.id)
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
