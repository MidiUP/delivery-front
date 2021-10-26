import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaErrorComponent } from 'src/app/alerta-error/alerta-error.component';
import { AlertaSuccesComponent } from 'src/app/alerta-succes/alerta-succes.component';
import { bairroService } from 'src/app/novo-bairro/bairro.service';

export interface DialogDataBairro {
  id: number;
}

@Component({
  selector: 'app-dialog-delete-bairro',
  templateUrl: './dialog-delete-bairro.component.html',
  styleUrls: ['./dialog-delete-bairro.component.css']
})
export class DialogDeleteBairroComponent implements OnInit {

  constructor(private bairroService: bairroService, public dialogRef: MatDialogRef<DialogDeleteBairroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataBairro, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  deleteBairro(){
    this.bairroService.deleteBairro(this.data.id)
      .subscribe(
        (res => {
          this.openSnackBarSuccess();
          this.dialogRef.close();
        }),
        (err => {
          this.openSnackBarError();
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
