import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { authService } from "../auth/auth.service/auth.service";
import { Address } from "../enderecos/address.model";
import { MetodoPagamento } from "../metodo-pagamento/metodoPagamento.model";
import { Product } from "../novo-produto/product.model";
import { AddressNullComponent } from "../snack-bars/address-null/address-null.component";
import { CarrinhoVazioComponent } from "../snack-bars/carrinho-vazio/carrinho-vazio.component";
import { MetodoPagamentoNullComponent } from "../snack-bars/metodo-pagamento-null/metodo-pagamento-null.component";
import { User } from "../user/user.model";
import { UserService } from "../user/user.service";
import { Cupom } from "./cupom.model";
import { Items } from "./items.model";
import { Order } from "./order.model";
import { orderService } from "./order.service";
import { Status } from "./status.model";

@Injectable()
export class carrinhoService {

  constructor(private authService: authService, private orderService: orderService, private router: Router, private _snackBar: MatSnackBar, private userService: UserService) {
    if (this.authService.isAuthenticated()) {
      let username: string = this.authService.getUsername();
      this.userService.findByUsername(username)
        .subscribe(data => this.userLogado.id = data.id);
    }
  }

  itensCarrinho: Product[] = [];
  totalPedido: number = 0;
  enderecoSelecionado: Address;
  pagamentoSelecionado: MetodoPagamento;
  frete: number = 0;
  items: Items[] = [];
  userLogado: User = new User("", "", "", "", "", "", "", 0);
  cupom: Cupom = new Cupom(1, "Frete off", 15);
  status: Status = new Status(1, "Pedido feito, aguardando estabelecimento aceitar");
  order: Order = new Order(0, this.userLogado, "", "", this.status, 0, this.cupom, this.items);

  addItem(produto: Product): void {
    if (!this.itensCarrinho.includes(produto)) {
      this.itensCarrinho.push(produto);
      produto.quantityCar = 1;
    } else {
      produto.quantityCar++;
    }
    produto.total = produto.quantityCar * produto.price;
    this.totalPedido += produto.price;

  }

  removeItem(produto: Product): void {
    if (produto.quantityCar == 1) {
      this.totalPedido -= produto.price
    }

    if (produto.quantityCar <= 1) {
      produto.quantityCar = 0;

      var index = this.itensCarrinho.indexOf(produto);
      if (index >= 0) {
        this.itensCarrinho.splice(index, 1);
      }
    }
    if (produto.quantityCar > 0)
      produto.quantityCar--;
    produto.total = produto.quantityCar * produto.price;

    if (produto.quantityCar > 0) {
      this.totalPedido -= produto.price;
    }

  }

  public getTotalPedido(): number {
    return this.totalPedido;
  }

  public getItensCarrinho(): Product[] {
    return this.itensCarrinho;
  }

  onClickEnderecoItem(endereco: Address): void {
    this.enderecoSelecionado = endereco;
    this.totalPedido -= this.frete;
    this.frete = this.enderecoSelecionado.neighborhood.value;
    this.totalPedido += this.frete;

  }

  selecionarMetodoPagamento(metodo: MetodoPagamento) {
    this.pagamentoSelecionado = metodo;
  }

  getMetodoPagamento(): MetodoPagamento {
    return this.pagamentoSelecionado;
  }

  getEnderecoSelecionado(): Address {
    return this.enderecoSelecionado
  }

  getFrete(): number {
    return this.frete;
  }

  exportarPedido(): boolean {

    if (this.authService.isAuthenticated() == true && this.itensCarrinho.length > 0 && this.pagamentoSelecionado != null && this.enderecoSelecionado != null) {


      this.itensCarrinho.forEach(item => {
        this.items.push(new Items(item.quantityCar, item))
      })

      this.order.user = this.userLogado;
      this.order.paymentMethod = this.pagamentoSelecionado.description;
      this.order.status = this.status;
      this.order.total = this.totalPedido;
      this.order.coupon = this.cupom;
      this.order.items = this.items;
      this.order.address = `${this.enderecoSelecionado.street}, ${this.enderecoSelecionado.number}, ${this.enderecoSelecionado.neighborhood.name}`;

      this.orderService.createOrder(this.order)
        .subscribe(
          (res => {
            console.log("pedido concluido");
          }),
          (err => {
            console.log(err);
            console.log(this.order);
          })
        )

      window.location.reload();

      return false;

    } else if (this.authService.isAuthenticated() != true) {
      this.router.navigate(['login']);
      return true;
    } else if (this.itensCarrinho.length == 0) {
      this.openSnackBarCarrinhoVazio();
      return false;
    } else if (this.enderecoSelecionado == null) {
      this.openSnackBarEnderecoVazio();
      return false;
    } else if (this.pagamentoSelecionado == null) {
      this.openSnackBarPagamentoVazio();
      return false;
    }

    return false;

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
