import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../novo-produto/product.model';
import { ProductService } from '../novo-produto/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaSuccesComponent } from '../alerta-succes/alerta-succes.component';
import { AlertaErrorComponent } from '../alerta-error/alerta-error.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';


@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {
  @Output() idDelete: number = 2;
  products: Product[];
  product: Product = new Product("", 0, "", true, 0, 0, 0, 0, 0);
  editProductForm: FormGroup;
  
  @Output() clickDelete = new EventEmitter;
  
  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();

    this.editProductForm = new FormGroup({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      description: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
      quantity: this.formBuilder.control('', [Validators.required, Validators.min(1)]),
      price: this.formBuilder.control('', [Validators.required, Validators.min(1)]),
      availability: this.formBuilder.control('', [])
    }, { updateOn: 'change' });


    // this.editProductForm = this.formbuilder.group({
    //   name:[null],
    //   description:[null],
    //   quantity:[null],
    //   price:[null],
    //   availability:[null]
    // })

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
    this.productService.putProduct(this.product, this.product.key)
      .subscribe(
        (res) => {
          console.log("editou");
          this.openSnackBarSuccess();
        },
        (err) => {
          console.log(err);
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
    const dialogRef = this.dialog.open(DialogDeleteComponent);
    this.idDelete=id;
  }

  Clicou(evento: any){
  
    this.productService.deleteProduct(this.idDelete)
      .subscribe(
        (res) => {
          console.log("apagou");
        },
        (err) => {
          console.log(err);
        }
      )
  }


}
