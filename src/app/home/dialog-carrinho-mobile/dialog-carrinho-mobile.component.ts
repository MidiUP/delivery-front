import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { authService } from 'src/app/auth/auth.service/auth.service';
import { Address } from 'src/app/enderecos/address.model';
import { addressService } from 'src/app/enderecos/address.service';
import { MetodoPagamento } from 'src/app/metodo-pagamento/metodoPagamento.model';
import { metodoPagamentoService } from 'src/app/metodo-pagamento/metodoPagamento.service';
import { Product } from 'src/app/novo-produto/product.model';
import { AddressNullComponent } from 'src/app/snack-bars/address-null/address-null.component';
import { CarrinhoVazioComponent } from 'src/app/snack-bars/carrinho-vazio/carrinho-vazio.component';
import { MetodoPagamentoNullComponent } from 'src/app/snack-bars/metodo-pagamento-null/metodo-pagamento-null.component';
import { TrocoErradoComponent } from 'src/app/snack-bars/troco-errado/troco-errado.component';
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
  pagamentoPorDinheiro: boolean = false;
  valorDinheiro: number = 0;
  pagamentoSelecionado: MetodoPagamento = this.carrinhoService.getMetodoPagamento();
  

  constructor(public dialogRef: MatDialogRef<DialogCarrinhoMobileComponent>,
    @Inject(MAT_DIALOG_DATA) public carrinho: Carrinho, private addressService: addressService,
                            private metodoPagamentoService: metodoPagamentoService, private carrinhoService: carrinhoService, public dialog: MatDialog, private authService: authService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getEnderecos();
    this.getPagamentos();
    console.log(this.itensCarrinho);
    
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
    this.pagamentoSelecionado = metodo;
    if(metodo.description === "Dinheiro"){
      this.pagamentoPorDinheiro = true;
    }else {
      this.pagamentoPorDinheiro = false;
    }
  }

  exportarPedido(){
    if (this.authService.isAuthenticated() == true && this.itensCarrinho.length > 0 && this.pagamentoSelecionado != null && this.enderecoEscolhido != null) {
      if(this.pagamentoSelecionado.description === "Dinheiro"){
        if(this.valorDinheiro >= this.carrinhoService.totalPedido){
          this.carrinhoService.valorDinheiro = this.valorDinheiro;
          this.openDialogFinalPedido();
        }else {
          this.openSnackBarDinheiroMenorQueTotal();
        }
      } else {
        this.openDialogFinalPedido();
      }
    }
    else if (this.authService.isAuthenticated() != true) {
      this.router.navigate(['login']);
    } else if (this.itensCarrinho.length == 0) {
      this.openSnackBarCarrinhoVazio();
    } else if (this.enderecoEscolhido == null) {
      this.openSnackBarEnderecoVazio();
    } else if (this.pagamentoSelecionado == null) {
      this.openSnackBarPagamentoVazio();
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

  openSnackBarDinheiroMenorQueTotal() {
    this._snackBar.openFromComponent(TrocoErradoComponent, {
      duration: 5 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  pagamentoDinheiro(isDinheiro: boolean) {
    this.pagamentoPorDinheiro = isDinheiro;
    this.alterarMetodoPagamento(new MetodoPagamento (0,"Dinheiro"))
  }

  openSnackBarCarrinhoVazio() {
    this._snackBar.openFromComponent(CarrinhoVazioComponent, {
      duration: 5 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  openSnackBarPagamentoVazio() {
    this._snackBar.openFromComponent(MetodoPagamentoNullComponent, {
      duration: 5 * 1000,
    });
  }

  openSnackBarEnderecoVazio() {
    this._snackBar.openFromComponent(AddressNullComponent, {
      duration: 5 * 1000,
    });
  }



}
