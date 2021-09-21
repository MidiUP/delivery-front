import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Adicional } from 'src/app/novo-produto/adicional.model';
import { Product } from 'src/app/novo-produto/product.model';
import { carrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-dialog-adicionar-produto',
  templateUrl: './dialog-adicionar-produto.component.html',
  styleUrls: ['./dialog-adicionar-produto.component.css']
})
export class DialogAdicionarProdutoComponent implements OnInit {

  adicionais: Adicional[] = [
    {name: "Bacon", price: 2.00, description: "250g de Bacon", quantity: 0, total: 0},
    {name: "Batata Frita", price: 5.00, description: "1 cone de batata frita", quantity: 0, total: 0},
    {name: "Cheddar", price: 3.00, description: "250g de Cheddar", quantity: 0, total: 0}
  ];

  constructor(public dialogRef: MatDialogRef<DialogAdicionarProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public produto: Product, private carrinhoService: carrinhoService) { }

  ngOnInit(): void {
    
  }

  addQuantityCar(){
    this.produto.quantityCar++;
    this.produto.total = this.produto.price * this.produto.quantityCar;
  }

  removeQuantityCar(){
    if(this.produto.quantityCar > 0){
      this.produto.quantityCar--;
    }
    this.produto.total = this.produto.price * this.produto.quantityCar;
  }

  addQuantityAdicional(adicional: Adicional){
    adicional.quantity++;
    adicional.total = adicional.price * adicional.quantity;
    this.produto.price += adicional.price;
    this.produto.total = this.produto.price * this.produto.quantityCar;
  }

  removeQuantityAdicional(adicional: Adicional){
    if(adicional.quantity>0){
      adicional.quantity--;
      this.produto.price -= adicional.price;
      this.produto.total = this.produto.price * this.produto.quantityCar;
    }
    adicional.total = adicional.price * adicional.quantity;
  }

}
