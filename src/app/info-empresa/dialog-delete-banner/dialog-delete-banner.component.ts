import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaErrorComponent } from 'src/app/alerta-error/alerta-error.component';
import { AlertaSuccesComponent } from 'src/app/alerta-succes/alerta-succes.component';
import { DialogData } from 'src/app/editar-produto/dialog-delete/dialog-delete.component';
import { Empresa } from '../empresa.model';
import { EmpresaService } from '../empresa.service';

@Component({
  selector: 'app-dialog-delete-banner',
  templateUrl: './dialog-delete-banner.component.html',
  styleUrls: ['./dialog-delete-banner.component.css']
})
export class DialogDeleteBannerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDeleteBannerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Empresa, private empresaService: EmpresaService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.data.backgroundPath = "";
  }

  delete() {
    this.empresaService.putEmpresa(this.data, 1)
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
