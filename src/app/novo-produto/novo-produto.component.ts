import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
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
    private productService: ProductService) { }

  ngOnInit(): void {
    this.newProductForm = new FormGroup({
      name: this.formBuilder.control('', []),
      description: this.formBuilder.control('', []),
      quantity: this.formBuilder.control('', []),
      price: this.formBuilder.control('', []),
      availability: this.formBuilder.control('', [])
    }, {updateOn: 'change'});
  }

  createProduct():void{
    console.log(this.product);
    
    this.productService.createProduct(this.product)
      .subscribe(
        data => {
          this.product = data;
          console.log(this.product);
          
        }
      )
  }


}


