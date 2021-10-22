import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { additionalRequired, Adicional } from 'src/app/novo-produto/adicional.model';
import { Product } from 'src/app/novo-produto/product.model';
import { carrinhoService } from '../carrinho.service';
import { additionalPedidos, Items } from '../items.model';

@Component({
  selector: 'app-dialog-adicionar-produto',
  templateUrl: './dialog-adicionar-produto.component.html',
  styleUrls: ['./dialog-adicionar-produto.component.css']
})
export class DialogAdicionarProdutoComponent implements OnInit {

  adicionais: Adicional[] = [];
  produtoOk: boolean;

  constructor(public dialogRef: MatDialogRef<DialogAdicionarProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public produto: Product, private carrinhoService: carrinhoService) { }

  ngOnInit(): void {
    console.log(this.produto)
    this.produto.additional?.forEach(item => {
      item.quantityCar = 0;
      item.total = 0;
    })

    this.produto.additionalRequired?.forEach(item => {
      item.totalAdditionals = 0;
      item.additional.forEach(item => {
        item.quantityCar = 0;
        item.total = 0;
      })
    })

    this.conferirProduto();

  }

  addQuantityCar() {
    this.produto.quantityCar++;
    this.produto.total = this.produto.price * this.produto.quantityCar;
  }


  removeQuantityCar() {
    if (this.produto.quantityCar > 1) {
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

  addQuantityAdicionalObrigatorio(adicional: Adicional, adicionalObrigatorio: additionalRequired) {
    let total: number = 0;
    adicionalObrigatorio.additional.forEach(item => {
      total += item.quantityCar;
    })
    if (total < adicionalObrigatorio.quantityMax) {
      adicional.quantityCar++;
    }
    this.lerQuantidadeAdicionaisObrigatorios(adicionalObrigatorio);
    this.conferirProduto();
  }

  removeQuantityAdicional(adicional: Adicional) {
    if (adicional.quantityCar > 0) {
      adicional.quantityCar--;
      this.produto.price -= adicional.price;
      this.produto.total = this.produto.price * this.produto.quantityCar;
      adicional.total = adicional.price * adicional.quantityCar;
    }
  }

  removeQuantityAdicionalObrigatorio(adicional: Adicional, adicionalObrigatorio: additionalRequired) {
    if (adicional.quantityCar > 0) {
      adicional.quantityCar--;
      // this.produto.price -= adicional.price;
      // this.produto.total = this.produto.price * this.produto.quantityCar;
      // adicional.total = adicional.price * adicional.quantityCar;
    }
    this.lerQuantidadeAdicionaisObrigatorios(adicionalObrigatorio);
    this.conferirProduto();
  }

  lerQuantidadeAdicionaisObrigatorios(adicionalObrigatorio: additionalRequired) {
    adicionalObrigatorio.totalAdditionals = 0;
    adicionalObrigatorio.additional.forEach(item => {
      adicionalObrigatorio.totalAdditionals += item.quantityCar;
    })

  }

  addCarrinho() {
    this.produto.additionalsString = this.lerAdicionais();
    let adicionais: additionalPedidos[] = [];
    let adicionaisObrigatorios: additionalPedidos[] = [];


    this.produto.additional?.forEach(item => {
      if (item.quantityCar > 0) {
        adicionais.push(new additionalPedidos(item, item.quantityCar))
      }
    })

    this.produto.additionalRequired?.forEach(item => {
      item.additional.forEach(item => {
        if(item.quantityCar>0) {
          adicionaisObrigatorios.push(new additionalPedidos(item, item.quantityCar))
        }
      })
    })

    this.produto.arrayAdicionais = adicionais;
    this.produto.arrayAdicionaisRequired = adicionaisObrigatorios;
    this.carrinhoService.addItem(this.produto);
    // console.log(this.produto)
  }

  lerAdicionais(): string {
    let adicionais: string = "";
    this.produto.additionalRequired?.forEach(item => {
      item.additional.forEach(item => {
        if (item.quantityCar > 0) {
          if (adicionais === "") {
            adicionais = `${item.name} (${item.quantityCar})`;
          } else {
            adicionais = `${adicionais}, ${item.name} (${item.quantityCar})`;
          }
        }
      })

    })
    this.produto.additional?.forEach(item => {
      if (item.quantityCar > 0) {
        if (adicionais === "") {
          adicionais = `${item.name} (${item.quantityCar})`;
        } else {
          adicionais = `${adicionais}, ${item.name} (${item.quantityCar})`;
        }
      }
    })
    console.log(adicionais)
    return adicionais;
  }

  conferirProduto() {
    let controlador: boolean = true;
    this.produto.additionalRequired?.forEach(item => {
      if (item.totalAdditionals < item.quantityMin || item.totalAdditionals > item.quantityMax) {
        controlador = false;
      }
    })
    this.produtoOk = controlador;
  }



}
