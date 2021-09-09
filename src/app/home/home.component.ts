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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  enderecosCadastrados: Address[] = [];
  enderecos: Address[];
  enderecoSelecionado: Address = this.carrinhoService.getEnderecoSelecionado();

  tiposPagamento: string[] = ["Á vista", "Cartão de Crédito", "Cartão de Débito", "Pix"];
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

  user: User = new User("", ".", "", "", "", "", "", 0);

  userLogado: User = new User("", ".", "", "", "", "", "", 1);

  pagamento: MetodoPagamento = new MetodoPagamento(1, "");

  pagamentos: MetodoPagamento[];

  cupom: Cupom = new Cupom(1, "Frete off", 15);

  bairro: Bairro = new Bairro("Lourival Peixoto", 3, 1, "30 Min",true);

  status: Status = new Status(1, "Pedido feito, aguardando estabelecimento aceitar");

  pesquisaName = new FormControl();

  carrinhoMobileOpen: boolean = false



  order: Order = new Order(0, this.user, this.pagamento.description, this.bairro.name, this.status, 0, this.cupom, this.items);


  constructor(private productService: ProductService,
    public dialog: MatDialog,
    private addressService: addressService,
    private orderService: orderService,
    private metodoPagamentoService: metodoPagamentoService,
    private categoriaService: categoriaService,
    private authService: authService,
    private userService: UserService,
    private carrinhoService: carrinhoService) {

  }

  ngOnInit(): void {
    
    if (this.authService.isAuthenticated()) {
      let username: string = this.authService.getUsername();
      this.userService.findByUsername(username)
        .subscribe(
          (data => {
            this.user = data;
            this.filtroEnderecos(this.user);
            this.userLogado.id = this.user.id;
          })
        )

    }
    
    this.getProducts();
    this.filtroEnderecos(this.user);
    this.getPagamentos();
    this.getCategorias();
    this.autoComplete();

    // setInterval(() => console.log(this.itensCarrinho), 10000)

  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(
        data => {
          this.products = data
        }
      );
  }

  // onClickEnderecoItem(endereco: Address): void {
  //   this.enderecoSelecionado = endereco;
  //   this.totalPedido -= this.frete;
  //   this.frete = this.enderecoSelecionado.neighborhood.value;
  //   this.totalPedido += this.frete;

  // }

  alterarEndereco(endereco: Address){
    this.carrinhoService.onClickEnderecoItem(endereco);
    this.totalPedido=this.carrinhoService.getTotalPedido();
    this.enderecoSelecionado=this.carrinhoService.getEnderecoSelecionado();
    this.frete=endereco.neighborhood.value;
  }

  // onClickTipoPagamento(pagamento: MetodoPagamento): void {
  //   this.pagamento = pagamento;
  //   this.order.paymentMethod = pagamento.description;
  // }

  alterarMetodoPagamento(metodo: MetodoPagamento){
    this.carrinhoService.selecionarMetodoPagamento(metodo);
    this.pagamentoSelecionado = metodo;
  }

  addItem(produto: Product): void {
    this.carrinhoService.addItem(produto);
    this.itensCarrinho = this.carrinhoService.getItensCarrinho();
    this.totalPedido = this.carrinhoService.getTotalPedido();

  }

  removeItem(produto: Product): void {
    this.carrinhoService.removeItem(produto);
    this.itensCarrinho = this.carrinhoService.getItensCarrinho();
    this.totalPedido = this.carrinhoService.getTotalPedido();

  }

  openDialog(produto: Product) {
    const dialogRef = this.dialog.open(DialogProdutoComponent, {
      data: { name: produto.name, description: produto.description, price: produto.price }
    });
  }

  openDialogCarMobile() {
    const dialogRef = this.dialog.open(DialogCarrinhoMobileComponent, {
      data: {user: this.user} 
    });

    this.carrinhoMobileOpen = true;

    dialogRef.afterClosed().subscribe(result => {
      this.carrinhoMobileOpen = false;
      this.totalPedido = this.carrinhoService.getTotalPedido();
      this.itensCarrinho = this.carrinhoService.getItensCarrinho();
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

  // exportarPedido() {

  //   this.itensCarrinho.forEach(item => {
  //     this.items.push(new Items(item.quantityCar, item))
  //   })

  //   this.order.user = this.userLogado;
  //   this.order.paymentMethod = this.pagamento.description;
  //   this.order.status = this.status;
  //   this.order.total = this.totalPedido;
  //   this.order.coupon = this.cupom;
  //   this.order.items = this.items;
  //   this.order.address = `${this.enderecoSelecionado.street}, ${this.enderecoSelecionado.number}, ${this.enderecoSelecionado.neighborhood.name}`

  //   this.orderService.createOrder(this.order)
  //     .subscribe(
  //       (res => {
  //         console.log("pedido concluido");
  //       }),
  //       (err => {
  //         console.log(err);
  //         console.log(this.order);
  //       })
  //     )

  //   // window.location.reload();
  // }

  exportarPedido(){
    this.carrinhoService.exportarPedido();
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
          this.products = data;
        })
      )
  }

  buscaName() {
    this.productService.searchProduct("", this.buscaNome)
      .subscribe(
        (data => {
          if (data.length > 0) {
            this.products = data;
            console.log(data);
            console.log(this.buscaNome);
          } else {
            this.products = [];
            console.log("vazio")
          }
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
              (data => this.products = data)
            )
          console.log("requisição");
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
              (data => this.products = data)
            )
        }),
      ).subscribe();
  }


}


