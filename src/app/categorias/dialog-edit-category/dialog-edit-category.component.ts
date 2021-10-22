import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaErrorComponent } from 'src/app/alerta-error/alerta-error.component';
import { AlertaSuccesComponent } from 'src/app/alerta-succes/alerta-succes.component';
import { DialogData } from 'src/app/editar-produto/dialog-delete/dialog-delete.component';
import { Categoria } from '../categoria.model';
import { categoriaService } from '../categoria.service';

@Component({
  selector: 'app-dialog-edit-category',
  templateUrl: './dialog-edit-category.component.html',
  styleUrls: ['./dialog-edit-category.component.css']
})
export class DialogEditCategoryComponent implements OnInit {

  editCategoriaForm: FormGroup = this.formBuilder.group({
    'name': ['', [Validators.required, Validators.minLength(2)]]
  });

  categoria: Categoria = new Categoria("",0);

  constructor(public dialogRef: MatDialogRef<DialogEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private categoriaService: categoriaService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.categoriaService.getCategory(this.data.id)
      .subscribe(data => this.categoria = data);
  }

  editCategoria(){
    this.categoriaService.putCategory(this.categoria, this.categoria.id)
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
