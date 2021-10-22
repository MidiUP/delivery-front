import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaErrorComponent } from 'src/app/alerta-error/alerta-error.component';
import { AlertaSuccesComponent } from 'src/app/alerta-succes/alerta-succes.component';
import { DialogData } from 'src/app/editar-produto/dialog-delete/dialog-delete.component';
import { categoriaService } from '../categoria.service';

@Component({
  selector: 'app-dialog-delete-category',
  templateUrl: './dialog-delete-category.component.html',
  styleUrls: ['./dialog-delete-category.component.css']
})
export class DialogDeleteCategoryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDeleteCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private categoriaService: categoriaService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  delete() {
    this.categoriaService.deleteCategory(this.data.id)
      .subscribe(
        (res => {
          this.openSnackBarSuccess();
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
