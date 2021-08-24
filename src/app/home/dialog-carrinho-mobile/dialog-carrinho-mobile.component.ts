import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from 'src/app/enderecos/address.model';
import { addressService } from 'src/app/enderecos/address.service';
import { MetodoPagamentoComponent } from 'src/app/metodo-pagamento/metodo-pagamento.component';
import { MetodoPagamento } from 'src/app/metodo-pagamento/metodoPagamento.model';
import { metodoPagamentoService } from 'src/app/metodo-pagamento/metodoPagamento.service';
import { Product } from 'src/app/novo-produto/product.model';
import { User } from 'src/app/user/user.model';

export interface Carrinho {
  user: User,
  products: Product[] 
}

@Component({
  selector: 'app-dialog-carrinho-mobile',
  templateUrl: './dialog-carrinho-mobile.component.html',
  styleUrls: ['./dialog-carrinho-mobile.component.css']
})


export class DialogCarrinhoMobileComponent implements OnInit {

  enderecos: Address[] =[];
  pagamentos: MetodoPagamento[] = [];

  constructor(public dialogRef: MatDialogRef<DialogCarrinhoMobileComponent>,
    @Inject(MAT_DIALOG_DATA) public carrinho: Carrinho, public addressService: addressService, public metodoPagamentoService: metodoPagamentoService) { }

  ngOnInit(): void {
    this.getEnderecos();
    this.getPagamentos();
    console.log(this.carrinho.products)
  }

  getEnderecos() {
    this.addressService.findAddressByUser(this.carrinho.user)
      .subscribe(
        (data => this.enderecos = data)
      )
  }

  getPagamentos(){
    this.metodoPagamentoService.getMetodosPagamentos()
      .subscribe(
        (data => this.pagamentos = data)
      )
  }



}
