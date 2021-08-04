import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Product } from '../novo-produto/product.model';
import { ProductService } from '../novo-produto/product.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {

  products: Product[];
  product: Product = new Product("", 0, "", true, 0, 0, 0, 0, 0);
  editProductForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();

    this.editProductForm = new FormGroup({
      name: this.formBuilder.control('', []),
      description: this.formBuilder.control('', []),
      quantity: this.formBuilder.control('', []),
      price: this.formBuilder.control('', []),
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
        },
        (err) => {
          console.log(err);
        }
      )
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



}
