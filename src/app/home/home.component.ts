import { Component, OnInit } from '@angular/core';

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

  precoProduto: number = 13.90;
  quantidadeProduto:number = 1;
  precoProdutoAtual:number=this.precoProduto;

  totalPedido:number=13.90;

  constructor() { }

  ngOnInit(): void {
  }

  onClickEnderecoItem(endereco: string):void {
    this.enderecoSelecionado = endereco;
  }

  onClickTipoPagamento(pagamento: string):void {
    this.pagamentoSelecionado = pagamento;
  }

  onClickAumentarQuantidade():void {
    this.quantidadeProduto++;
    this.precoProdutoAtual = this.precoProduto*this.quantidadeProduto;
   
  }

  onClickDiminuirQuantidade():void{
    if(this.quantidadeProduto > 0){
    this.quantidadeProduto--;}
    this.precoProdutoAtual = this.precoProduto*this.quantidadeProduto;

  }



}


