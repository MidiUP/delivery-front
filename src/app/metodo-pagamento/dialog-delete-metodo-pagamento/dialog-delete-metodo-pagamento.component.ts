import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaErrorComponent } from 'src/app/alerta-error/alerta-error.component';
import { AlertaSuccesComponent } from 'src/app/alerta-succes/alerta-succes.component';
import { DialogDataBairro } from 'src/app/bairros/dialog-delete-bairro/dialog-delete-bairro.component';
import { metodoPagamentoService } from '../metodoPagamento.service';

@Component({
  selector: 'app-dialog-delete-metodo-pagamento',
  templateUrl: './dialog-delete-metodo-pagamento.component.html',
  styleUrls: ['./dialog-delete-metodo-pagamento.component.css']
})
export class DialogDeleteMetodoPagamentoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDataBairro, private _snackBar: MatSnackBar, private metodoPagamentoService:metodoPagamentoService, public dialogRef: MatDialogRef<DialogDeleteMetodoPagamentoComponent>) { }

  ngOnInit(): void {
  }

  deleteBairro(){
    this.metodoPagamentoService.deleteMetodoPagamento(this.data.id)
      .subscribe(
        (res => {
          this.openSnackBarSuccess();
          this.dialogRef.close()
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
