import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../novo-produto/product.model';
import { ProductService } from '../novo-produto/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaSuccesComponent } from '../alerta-succes/alerta-succes.component';
import { AlertaErrorComponent } from '../alerta-error/alerta-error.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { categoriaService } from '../categorias/categoria.service';
import { Categoria } from '../categorias/categoria.model';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';


@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {
  products: Product[];
  product: Product = new Product("", 0, "", true, 0, 0, 0, 0, 0, {id: 0, description:""});
  editProductForm: FormGroup;
  categorias: Categoria[];
  
  
  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private categoriaService: categoriaService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategorias();

    this.editProductForm = new FormGroup({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      description: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
      category: this.formBuilder.control('', []),
      quantity: this.formBuilder.control('', [Validators.required, Validators.min(1)]),
      price: this.formBuilder.control('', [Validators.required, Validators.min(1)]),
      availability: this.formBuilder.control('', [])
    }, { updateOn: 'change' });

  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(
        data => {
          this.products = data;
        }
      );
  }

  onSubmit() {
    this.productService.putProduct(this.product, this.product.id)
      .subscribe(
        (res) => {
          console.log("editou");
          this.openSnackBarSuccess();
        },
        (err) => {
          console.log(err);
          console.log(this.product);
          this.openSnackBarError();
        }
      );
  }

  edit(product: Product): void {
    this.product = product;
  }

  delete(key: number) {
    this.productService.deleteProduct(key)
      .subscribe(
        (res) => {
          console.log("apagou");
        },
        (err) => {
          console.log(err);
        }
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

  openDialog(id:number) {
    const dialogRef = this.dialog.open(DialogDeleteComponent,{
      data:{id: id}
    });
  }

  getCategorias(): void {
    this.categoriaService.getCategories()
      .subscribe(
        data => {
          this.categorias = data;
        }
      );
  }

  openDialogInfo(produto: Product) {
    const dialogRef = this.dialog.open(DialogInfoComponent, {
      data: { name: produto.name, description: produto.description, price: produto.price }
    });
  }

  filtroProdutos(categoria: string){
    this.productService.searchProduct(categoria, "")
      .subscribe(
        (data => {
          this.products = data;
        })
      )
  }

}
