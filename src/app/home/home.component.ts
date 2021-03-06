import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Categoria } from '../categorias/categoria.model';
import { categoriaService } from '../categorias/categoria.service';
import { MetodoPagamento } from '../metodo-pagamento/metodoPagamento.model';
import { metodoPagamentoService } from '../metodo-pagamento/metodoPagamento.service';
import { Bairro } from '../novo-bairro/bairro.model';
import { Product } from '../novo-produto/product.model';
import { ProductService } from '../novo-produto/product.service';
import { Address } from '../enderecos/address.model';
import { addressService } from '../enderecos/address.service';
import { User } from '../user/user.model';
import { Cupom } from './cupom.model';
import { DialogProdutoComponent } from './dialog-produto/dialog-produto.component';
import { Items } from './items.model';
import { Order } from './order.model';
import { orderService } from './order.service';
import { Status } from './status.model';
import { map, tap, filter, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { authService } from '../auth/auth.service/auth.service';
import { UserService } from '../user/user.service';
import { DialogCarrinhoMobileComponent } from './dialog-carrinho-mobile/dialog-carrinho-mobile.component';
import { carrinhoService } from './carrinho.service';
import { DialogAdicionarProdutoComponent } from './dialog-adicionar-produto/dialog-adicionar-produto.component';
import { DialogFinalizarPedidoComponent } from './dialog-finalizar-pedido/dialog-finalizar-pedido.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarrinhoVazioComponent } from '../snack-bars/carrinho-vazio/carrinho-vazio.component';
import { MetodoPagamentoNullComponent } from '../snack-bars/metodo-pagamento-null/metodo-pagamento-null.component';
import { AddressNullComponent } from '../snack-bars/address-null/address-null.component';
import { Router } from '@angular/router';
import { DialogHistoricoComponent } from './dialog-historico/dialog-historico.component';
import { TrocoErradoComponent } from '../snack-bars/troco-errado/troco-errado.component';
import { EmpresaService } from '../info-empresa/empresa.service';
import { Empresa } from '../info-empresa/empresa.model';
import { DialogPedidoConcluidoComponent } from './dialog-pedido-concluido/dialog-pedido-concluido.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  enderecosCadastrados: Address[] = [];
  enderecos: Address[];
  enderecoSelecionado: Address = this.carrinhoService.getEnderecoSelecionado();

  tiposPagamento: string[] = ["?? vista", "Cart??o de Cr??dito", "Cart??o de D??bito", "Pix"];
  pagamentoSelecionado: MetodoPagamento = this.carrinhoService.getMetodoPagamento();

  quantidadeProdutoCarrinho: number = 1;
  precoProdutoAtual: number;

  totalPedido: number = this.carrinhoService.getTotalPedido();

  frete: number = 0;

  products: Product[] = [];

  itensCarrinho: Product[] = this.carrinhoService.getItensCarrinho();

  items: Items[] = [];

  categorias: Categoria[];

  buscaNome: string = "";

  user: User = new User("", ".", "", "", "", 0);

  userLogado: User = new User("", ".", "", "", "", 0);

  pagamento: MetodoPagamento = new MetodoPagamento(1, "");

  pagamentos: MetodoPagamento[];

  cupom: Cupom = new Cupom(1, "Frete off", 15);

  bairro: Bairro = new Bairro("Lourival Peixoto", 3, 1, "30 Min", true);

  status: Status = new Status(1, "Fa??a o seu Pedido");

  pesquisaName = new FormControl();

  carrinhoMobileOpen: boolean = false;

  ultimoPedido: Order = new Order(0, this.user, "", this.status, 0, this.items, "", 0);

  pagamentoPorDinheiro: boolean = false;

  valorDinheiro: number = 0;

  empresa: Empresa = new Empresa(0, "", "", "", "", "", "", "", "", true, [], "", "", 0);

  isLogged: boolean = false;

  isDelivery: boolean = false;

  enderecoRetirada: Address = new Address("Retirada na Loja", new Bairro("", 0, 0, "", true), "", "", "", "", this.userLogado, 0)



  order: Order = new Order(0, this.user, this.pagamento.description, this.status, 0, this.items, "", 0);


  constructor(private productService: ProductService,
    public dialog: MatDialog,
    private addressService: addressService,
    private orderService: orderService,
    private metodoPagamentoService: metodoPagamentoService,
    private categoriaService: categoriaService,
    private authService: authService,
    private userService: UserService,
    private carrinhoService: carrinhoService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private empresaService: EmpresaService) { }

  ngOnInit(): void {

    if (this.authService.isAuthenticated()) {
      this.isLogged = true;
      let username: string = this.authService.getUsername();
      this.userService.findByUsername(username)
        .subscribe(
          (data => {
            this.user = data;
            this.filtroEnderecos(this.user);
            this.userLogado.id = this.user.id;
            this.ultimoPedidoByCliente(this.user.id);
            this.carrinhoService.setUserLogado(this.user.id);
          })
        )

    }

    this.autoComplete();
    this.getProducts();
    this.filtroEnderecos(this.user);
    this.getPagamentos();
    this.getCategorias();
    this.getEmpresa();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(
        data => {
          this.products = [];
          data.forEach(produto => {
            if (produto.availability == true) {
              this.products.push(produto);
            }
          })

        }
      );
  }

  getEmpresa() {
    this.empresaService.getEmpresaById()
      .subscribe(res => {
        this.empresa = res;
      });
  }

  alterarEndereco(endereco: Address) {
    this.carrinhoService.onClickEnderecoItem(endereco);
    this.totalPedido = this.carrinhoService.getTotalPedido();
    this.enderecoSelecionado = this.carrinhoService.getEnderecoSelecionado();
    this.frete = endereco.neighborhood.value;
  }

  stringAddress(): string {
    if (this.enderecoSelecionado.street === "Retirada na Loja") {
      return "Retirada na Loja"
    } else {
      return `${this.enderecoSelecionado.street}, ${this.enderecoSelecionado.number}, ${this.enderecoSelecionado.neighborhood.name}`;
    }
  }


  alterarMetodoPagamento(metodo: MetodoPagamento) {
    this.carrinhoService.selecionarMetodoPagamento(metodo);
    this.pagamentoSelecionado = metodo;
    if (metodo.description === "Dinheiro") {
      this.pagamentoPorDinheiro = true;
    } else {
      this.pagamentoPorDinheiro = false;
    }
  }

  addItem(produto: Product): void {
    this.openDialogAddProduto(produto);
    // this.carrinhoService.addItem(produto);
    // this.itensCarrinho = this.carrinhoService.getItensCarrinho();
    // this.totalPedido = this.carrinhoService.getTotalPedido();

  }

  aumentarQuantidade(produto: Product) {
    this.carrinhoService.aumentarItem(produto);
    this.itensCarrinho = this.carrinhoService.getItensCarrinho();
    this.totalPedido = this.carrinhoService.getTotalPedido();
  }

  removeItem(produto: Product): void {
    this.carrinhoService.diminuirItem(produto);
    this.itensCarrinho = this.carrinhoService.getItensCarrinho();
    this.totalPedido = this.carrinhoService.getTotalPedido();

  }

  openDialog(produto: Product) {
    const dialogRef = this.dialog.open(DialogProdutoComponent, {
      data: { name: produto.name, description: produto.description, price: produto.price, imagePath: produto.imagePath }
    });
  }

  openDialogAddProduto(produto: Product) {
    const dialogRef = this.dialog.open(DialogAdicionarProdutoComponent, {
      data: { name: produto.name, description: produto.description, id: produto.id, price: produto.price, quantityCar: 1, total: produto.price, additional: produto.additional, imagePath: produto.imagePath, additionalRequired: produto.additionalRequired }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.totalPedido = this.carrinhoService.getTotalPedido();
      this.itensCarrinho = this.carrinhoService.getItensCarrinho();
    });
  }

  openDialogCarMobile() {
    const dialogRef = this.dialog.open(DialogCarrinhoMobileComponent, {
      data: { user: this.user, open: this.empresa.open, minValue: this.empresa.minValue }
    });

    this.carrinhoMobileOpen = true;

    dialogRef.afterClosed().subscribe(result => {
      this.carrinhoMobileOpen = false;
      this.totalPedido = this.carrinhoService.getTotalPedido();
      this.itensCarrinho = this.carrinhoService.getItensCarrinho();
    });
  }

  openDialogFinalPedido() {
    const dialogRef = this.dialog.open(DialogFinalizarPedidoComponent, {
      data: {}
    });
  }

  openHistorico() {
    const dialogRef = this.dialog.open(DialogHistoricoComponent, {
      data: { id: this.userLogado.id }
    });
  }

  filtroEnderecos(user: User) {
    this.addressService.findAddressByUser(user)
      .subscribe(
        data => {
          this.enderecosCadastrados = data;
        }
      )
  }

  exportarPedido() {

    if (this.authService.isAuthenticated() == true && this.itensCarrinho.length > 0 && this.pagamentoSelecionado != null && this.enderecoSelecionado != null) {
      if (this.pagamentoSelecionado.description === "Dinheiro") {
        if (this.valorDinheiro >= this.carrinhoService.totalPedido) {
          this.carrinhoService.valorDinheiro = this.valorDinheiro;
          this.openDialogFinalPedido();
        } else {
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
    } else if (this.enderecoSelecionado == null) {
      this.openSnackBarEnderecoVazio();
    } else if (this.pagamentoSelecionado == null) {
      this.openSnackBarPagamentoVazio();
    }
    // this.carrinhoService.exportarPedido();
  }

  openSnackBarCarrinhoVazio() {
    this._snackBar.openFromComponent(CarrinhoVazioComponent, {
      duration: 5 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  openSnackBarDinheiroMenorQueTotal() {
    this._snackBar.openFromComponent(TrocoErradoComponent, {
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


  getPagamentos() {
    this.metodoPagamentoService.getMetodosPagamentos()
      .subscribe(
        (data => {
          this.pagamentos = data;
        })
      )
  }

  getProdutosByCategoria(categoria: string) {
    this.productService.searchProduct(categoria, "");
  }

  getCategorias() {
    this.categoriaService.getCategories()
      .subscribe(
        (data => {
          this.categorias = data;
        })
      )
  }

  selectCategoria(categoria: string) {
    this.productService.searchProduct(categoria, "")
      .subscribe(
        (data => {
          this.products = [];
          data.forEach(produto => {
            if (produto.availability == true) {
              this.products.push(produto);
            }
          })
          // this.products = data;
        })
      )
  }

  buscaName() {
    this.productService.searchProduct("", this.buscaNome)
      .subscribe(
        (data => {
          this.products = [];
          data.forEach(produto => {
            if (produto.availability == true) {
              this.products.push(produto);
            }
          })
        })
      )
  }

  autoComplete() {
    this.pesquisaName.valueChanges
      .pipe(
        map(value => value.trim()),
        filter(value => value.length > 2),
        debounceTime(200),
        distinctUntilChanged(),
        tap(value => {
          this.productService.searchProduct("", value)
            .subscribe(
              (data => {
                this.products = [];
                data.forEach(produto => {
                  if (produto.availability == true) {
                    this.products.push(produto);
                  }
                })
              })
            )
        }),
      ).subscribe();

    this.pesquisaName.valueChanges
      .pipe(
        map(value => value.trim()),
        filter(value => value.length < 3),
        debounceTime(200),
        distinctUntilChanged(),
        tap(value => {
          this.productService.searchProduct("", "")
            .subscribe(
              (data => {
                this.products = [];
                data.forEach(produto => {
                  if (produto.availability == true) {
                    this.products.push(produto);
                  }
                })
              })
            )
        }),
      ).subscribe();
  }

  ultimoPedidoByCliente(id: number) {
    this.orderService.getOrdersByUserInDate(id)
      .subscribe(
        (res => {
          if (res.length > 0) {
            this.ultimoPedido = res[res.length - 1]
          }
        }),
        (err => console.log(err))
      )
  }

  pagamentoDinheiro(isDinheiro: boolean) {
    this.pagamentoPorDinheiro = isDinheiro;
    this.alterarMetodoPagamento(new MetodoPagamento(0, "Dinheiro"))
  }

  retornoBackground(): string {
    if (this.empresa.backgroundPath == "") {
      return "overflow: hidden; background: white;"
    } else {
      let urlVetor: string[] = this.empresa.backgroundPath.split(' ');
      let url: string = "";
      let primeiro: boolean = true;
      urlVetor.forEach(v => {
        if (primeiro) {
          url = url + v;
          primeiro = false;
        } else {
          url = url + "%20" + v;
        }
      })
      return "overflow: hidden; background: url(" + url + ")" + "no-repeat fixed; background-size: cover;"
    }
  }

}


