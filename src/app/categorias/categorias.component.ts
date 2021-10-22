import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaErrorComponent } from '../alerta-error/alerta-error.component';
import { AlertaSuccesComponent } from '../alerta-succes/alerta-succes.component';
import { Categoria } from './categoria.model';
import { categoriaService } from './categoria.service';
import { DialogDeleteCategoryComponent } from './dialog-delete-category/dialog-delete-category.component';
import { DialogEditCategoryComponent } from './dialog-edit-category/dialog-edit-category.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[];
  categoriaEdit: Categoria = new Categoria("", 0);
  categoriaNew: Categoria = new Categoria("", 0);
  newCategoriaForm: FormGroup;
  categoriaArray: Categoria;
  editCategoriaForm: FormGroup;




  constructor(private categoriaService: categoriaService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.getCategorias();

    this.newCategoriaForm = new FormGroup({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(2)])
    }, { updateOn: 'change' });

  }

  createCategory() {
    this.categoriaService.createCategory(this.categoriaNew)
      .subscribe(
        (res) => {
          this.openSnackBarSuccess();
          this.getCategorias();

        },
        (err) => {
          this.openSnackBarError();
          this.getCategorias();
        }
      )
  }

  getCategorias(): void {
    this.categoriaService.getCategories()
      .subscribe(
        data => {
          this.categorias = data;
        }
      );
  }

  editCategory(id: number) {
    this.openDialogEdit(id);
    // this.categoriaService.putCategory(this.categoriaEdit, this.categoriaEdit.id)
    //   .subscribe(
    //     (res) => {
    //       console.log("editou");
    //       this.getCategorias();
    //     },
    //     (err) => {
    //       console.log(err);
    //       this.getCategorias();
    //     }
    //   )
  }

  delete(id: number) {

    this.openDialogDelete(id);

    // this.categoriaService.deleteCategory(id)
    //   .subscribe(
    //     (res) => {
    //       this.openSnackBarSuccess();
    //       this.getCategorias();
    //     },
    //     (err) => {
    //       this.openSnackBarError();
    //       this.getCategorias();
    //     }

    // )

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

  openDialogDelete(id: number) {
    const dialogRef = this.dialog.open(DialogDeleteCategoryComponent, {
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCategorias();
    });

  }

  openDialogEdit(id: number) {
    const dialogRef = this.dialog.open(DialogEditCategoryComponent, {
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCategorias();
    });

  }




}
