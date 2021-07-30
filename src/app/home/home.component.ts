import { Component, OnInit } from '@angular/core';
import { Produto } from './produto.model';

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

  frete: number = 0;


  produto1: Produto = new Produto(
        1, "X-tudo", 13.90, "Hamburguer bom", true, 20, 0, 0
        );

  produto2: Produto = new Produto(
        2, "X-bacon", 19.95, "Hamburguer bom", true, 20, 0, 0
        );

  produto3: Produto = new Produto(
        3, "X-salada", 9.95, "Hamburguer bom", true, 20, 0, 0
        );
  
  produto4: Produto = new Produto(
        4, "X-gordo", 25.95, "Hamburguer bom", true, 20, 0, 0
        );
  produto5: Produto = new Produto(
        5, "Cheddar", 25.95, "Hamburguer bom", true, 20, 0, 0
        );
  produto6: Produto = new Produto(
        6, "bbc", 25.95, "Hamburguer bom", true, 20, 0, 0
        );

  produto7: Produto = new Produto(
        6, "bbc", 25.95, "Hamburguer bom", true, 20, 0, 0
        );

  produto8: Produto = new Produto(
        6, "bbc", 25.95, "Hamburguer bom", true, 20, 0, 0
        );

      

  cardapio: Produto[] = [this.produto1,this.produto2,this.produto3,this.produto4, this.produto5, this.produto6, this.produto7, this.produto8];

  itensCarrinho: Produto[] = [];
  

  constructor() { }

  ngOnInit(): void {

    
  }


  onClickEnderecoItem(endereco: string):void {
    this.enderecoSelecionado = endereco;
  }

  onClickTipoPagamento(pagamento: string):void {
    this.pagamentoSelecionado = pagamento;
  }

  addItem(produto: Produto):void{
    if(!this.itensCarrinho.includes(produto)){
      this.itensCarrinho.push(produto);
      produto.quantityCar=1;
    }else{
    produto.quantityCar++;}
    produto.precoTotal = produto.quantityCar * produto.price;
    this.totalPedido += produto.price;

  }

  removeItem(produto: Produto):void{
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
    produto.precoTotal = produto.quantityCar * produto.price;
    
    if(produto.quantityCar>0){
    this.totalPedido -= produto.price;}

  }
  
  
}


