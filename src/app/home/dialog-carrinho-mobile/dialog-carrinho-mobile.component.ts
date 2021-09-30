import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { authService } from 'src/app/auth/auth.service/auth.service';
import { Address } from 'src/app/enderecos/address.model';
import { addressService } from 'src/app/enderecos/address.service';
import { MetodoPagamento } from 'src/app/metodo-pagamento/metodoPagamento.model';
import { metodoPagamentoService } from 'src/app/metodo-pagamento/metodoPagamento.service';
import { Product } from 'src/app/novo-produto/product.model';
import { User } from 'src/app/user/user.model';
import { carrinhoService } from '../carrinho.service';
import { DialogFinalizarPedidoComponent } from '../dialog-finalizar-pedido/dialog-finalizar-pedido.component';
import { Items } from '../items.model';

export interface Carrinho {
  user: User,
  products: Product[],
  total: number;
}

@Component({
  selector: 'app-dialog-carrinho-mobile',
  templateUrl: './dialog-carrinho-mobile.component.html',
  styleUrls: ['./dialog-carrinho-mobile.component.css']
})


export class DialogCarrinhoMobileComponent implements OnInit {

  enderecos: Address[] =[];
  pagamentos: MetodoPagamento[] = [];
  itensCarrinho: Product[] = this.carrinhoService.getItensCarrinho();
  totalPedido: number= this.carrinhoService.getTotalPedido();
  pagamentoEscolhido: MetodoPagamento = this.carrinhoService.getMetodoPagamento();
  enderecoEscolhido: Address = this.carrinhoService.getEnderecoSelecionado();
  frete: number = this.carrinhoService.getFrete();

  constructor(public dialogRef: MatDialogRef<DialogCarrinhoMobileComponent>,
    @Inject(MAT_DIALOG_DATA) public carrinho: Carrinho, private addressService: addressService,
                            private metodoPagamentoService: metodoPagamentoService, private carrinhoService: carrinhoService, public dialog: MatDialog, private authService: authService) { }

  ngOnInit(): void {
    this.getEnderecos();
    this.getPagamentos();
    console.log(this.itensCarrinho)
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

  addItem(produto: Product): void {
    this.carrinhoService.aumentarItem(produto);
    this.itensCarrinho = this.carrinhoService.getItensCarrinho();
    this.totalPedido = this.carrinhoService.getTotalPedido();
  }

  removeItem(produto: Product): void {
    this.carrinhoService.diminuirItem(produto);
    this.itensCarrinho = this.carrinhoService.getItensCarrinho();
    this.totalPedido = this.carrinhoService.getTotalPedido();

  }

  alterarEndereco(endereco: Address){
    this.carrinhoService.onClickEnderecoItem(endereco);
    this.totalPedido=this.carrinhoService.getTotalPedido();
    this.enderecoEscolhido=this.carrinhoService.getEnderecoSelecionado();
    this.frete=endereco.neighborhood.value;
  }

  alterarMetodoPagamento(metodo: MetodoPagamento){
    this.carrinhoService.selecionarMetodoPagamento(metodo);
    this.pagamentoEscolhido = metodo;
  }

  exportarPedido(){
    if (this.authService.isAuthenticated() == true && this.itensCarrinho.length > 0 && this.pagamentoEscolhido != null && this.enderecoEscolhido != null) {
      this.openDialogFinalPedido();
    }

    // if(this.carrinhoService.exportarPedido("")==true){
    //   this.dialogRef.close();
    // }
  }

  openDialogFinalPedido() {
    const dialogRef = this.dialog.open(DialogFinalizarPedidoComponent, {
      data: {}
    });
  }



}
