import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../novo-produto/product.model';
import { ProductService } from '../novo-produto/product.service';
import { DialogProdutoComponent } from './dialog-produto/dialog-produto.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {  

  enderecosCadastrados: string[] = ["Rua Miguel Couto, 2395", "Av. Higino Cunha, 980", "Av. Solferina Ricci pace, 800"];;
  enderecoSelecionado: string = "";

  tiposPagamento: string[] = ["Á vista","Cartão de Crédito", "Cartão de Débito", "Pix"];
  pagamentoSelecionado: string = "";

  quantidadeProdutoCarrinho:number = 1;
  precoProdutoAtual:number;

  totalPedido:number = 0;

  frete: number = 0
      
  products: Product[] =  [];

  itensCarrinho: Product[] = [];
  

  constructor(private productService: ProductService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts():void{    
    this.productService.getProducts()
      .subscribe(
        data=>{
          this.products = data         
        }
      );
  }

  onClickEnderecoItem(endereco: string):void {
    this.enderecoSelecionado = endereco;
  }

  onClickTipoPagamento(pagamento: string):void {
    this.pagamentoSelecionado = pagamento;
  }

  addItem(produto: Product):void{
    if(!this.itensCarrinho.includes(produto)){
      this.itensCarrinho.push(produto);
      produto.quantityCar=1;
    }else{
    produto.quantityCar++;}
    produto.total = produto.quantityCar * produto.price;
    this.totalPedido += produto.price;

  }

  removeItem(produto: Product):void{
    if(produto.quantityCar==1){
      this.totalPedido-=produto.price
    }

    if(produto.quantityCar<=1){
      produto.quantityCar=0;
      
      var index = this.itensCarrinho.indexOf(produto);
      if(index>=0){
          this.itensCarrinho.splice(index , 1);
        }
    }
    if(produto.quantityCar>0)
    produto.quantityCar--;
    produto.total = produto.quantityCar * produto.price;
    
    if(produto.quantityCar>0){
    this.totalPedido -= produto.price;}

  }

  openDialog(produto:Product) {
    const dialogRef = this.dialog.open(DialogProdutoComponent,{
      data:{name:produto.name, description:produto.description, price:produto.price}
    });
  }
  
  
}


