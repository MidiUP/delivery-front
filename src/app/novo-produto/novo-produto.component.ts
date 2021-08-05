import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaErrorComponent } from '../alerta-error/alerta-error.component';
import { AlertaSuccesComponent } from '../alerta-succes/alerta-succes.component';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.css']
})
export class NovoProdutoComponent implements OnInit {


  newProductForm: FormGroup;
  product: Product = new Product("",0,"",true,0,0,0,0,0);

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.newProductForm = new FormGroup({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      description: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
      quantity: this.formBuilder.control('', [Validators.required, Validators.min(1)]),
      price: this.formBuilder.control('', [Validators.required, Validators.min(1)]),
      availability: this.formBuilder.control('', [])
    }, {updateOn: 'change'});
  }

  createProduct():void{
    console.log(this.product);
    
    this.productService.createProduct(this.product)
    .subscribe(
      (res) => {
        this.openSnackBarSuccess();

      },
      (err) => {
        console.log(err);
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


}


