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

  adicionais: Adicional[] = [];

  constructor(public dialogRef: MatDialogRef<DialogAdicionarProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public produto: Product, private carrinhoService: carrinhoService) { }

  ngOnInit(): void {
    this.produto.additional?.forEach(item => {
      item.quantityCar = 0;
      item.total = 0;
    })

  }

  addQuantityCar() {
    this.produto.quantityCar++;
    this.produto.total = this.produto.price * this.produto.quantityCar;
  }

  removeQuantityCar() {
    if (this.produto.quantityCar > 0) {
      this.produto.quantityCar--;
    }
    this.produto.total = this.produto.price * this.produto.quantityCar;
  }

  addQuantityAdicional(adicional: Adicional) {
    adicional.quantityCar++;
    adicional.total = adicional.price * adicional.quantityCar;
    this.produto.price += adicional.price;
    this.produto.total = this.produto.price * this.produto.quantityCar;
  }

  removeQuantityAdicional(adicional: Adicional) {
    if (adicional.quantityCar > 0) {
      adicional.quantityCar--;
      this.produto.price -= adicional.price;
      this.produto.total = this.produto.price * this.produto.quantityCar;
      adicional.total = adicional.price * adicional.quantityCar;
    }
  }

  addCarrinho() {
    this.produto.additionalsString = this.lerAdicionais();
    this.carrinhoService.addItem(this.produto);

  }

  lerAdicionais(): string {
    let adicionais: string = "";
    this.produto.additional?.forEach(item => {
      if (item.quantityCar > 0) {
        if (adicionais === "") {
          adicionais = `${item.name} (${item.quantityCar})`;
        } else {
          adicionais = `${adicionais}, ${item.name} (${item.quantityCar})`;
        }
      }
    })
    return adicionais;
  }

}
