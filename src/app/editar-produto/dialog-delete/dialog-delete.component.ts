import { Component, Input, Output, OnInit, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../novo-produto/product.service';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent implements OnInit {

  constructor(private productService: ProductService,
            public dialogRef: MatDialogRef<DialogDeleteComponent>,
            @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {

  }

  delete() {
    this.productService.deleteProduct(this.data.id)
      .subscribe(
        (data) => {
          console.log(data); 
          window.location.reload();        
        },
        (error) => {
          console.log("error");
          
        }
      )
  }

  
}
