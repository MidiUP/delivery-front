import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaErrorComponent } from '../alerta-error/alerta-error.component';
import { AlertaSuccesComponent } from '../alerta-succes/alerta-succes.component';
import { Categoria } from '../categorias/categoria.model';
import { categoriaService } from '../categorias/categoria.service';
import { Product } from './product.model';
import { ProductService } from './product.service';


@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.css']
})
export class NovoProdutoComponent implements OnInit {

  categorias: Categoria[];
  newProductForm: FormGroup;
  product: Product = new Product("",0,"",true,0,0,0, 0, 0, {id:0, description: ""});

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    private categoriaService: categoriaService) { }

  ngOnInit(): void {

    this.getCategorias();

    this.newProductForm = new FormGroup({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      description: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
      category: this.formBuilder.control('', ),
      quantity: this.formBuilder.control('', [Validators.required, Validators.min(1)]),
      price: this.formBuilder.control('', [Validators.required, Validators.min(1)]),
      availability: this.formBuilder.control('', [])
    }, {updateOn: 'change'});
  }

  createProduct():void{
    
    this.productService.createProduct(this.product)
    .subscribe(
      (res) => {
        this.openSnackBarSuccess();
        window.location.href= "/admin?newProduct"

      },
      (err) => {
        this.openSnackBarError();
      }
    );
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

  getCategorias(): void {
    this.categoriaService.getCategories()
      .subscribe(
        data => {
          this.categorias = data;
        }
      );
  }


}


