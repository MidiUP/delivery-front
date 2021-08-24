import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/novo-produto/product.model';


@Component({
  selector: 'app-dialog-produto',
  templateUrl: './dialog-produto.component.html',
  styleUrls: ['./dialog-produto.component.css']
})
export class DialogProdutoComponent implements OnInit {

  product: string;

  constructor(public dialogRef: MatDialogRef<DialogProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public produto: Product) { }

  ngOnInit(): void {

  }

}
