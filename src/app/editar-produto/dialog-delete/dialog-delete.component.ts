import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ProductService } from '../../novo-produto/product.service';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent implements OnInit {

  @Input() idDeleteFilho: number;
  @Output() clickDelete = new EventEmitter;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    console.log(this.idDeleteFilho);
  }

  delete() {

    // this.productService.deleteProduct(this.idDeleteFilho)
    //   .subscribe(
    //     (res) => {
    //       console.log("apagou");
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   )
    this.clickDelete.emit();
  }

  
}
