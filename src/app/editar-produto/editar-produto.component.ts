import { Component, OnInit } from '@angular/core';
import { Product } from '../novo-produto/product.model';
import { ProductService } from '../novo-produto/product.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {

  products: Product[] =  [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
    console.log(this.products)
    
  }

  getProducts():void{
    this.productService.getProducts()
      .subscribe(
        data=>{
        this.products = data;
        
        }
      );

  }

}
