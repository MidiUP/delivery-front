import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/enderecos/address.model';
import { MetodoPagamento } from 'src/app/metodo-pagamento/metodoPagamento.model';
import { Product } from 'src/app/novo-produto/product.model';
import { carrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-dialog-finalizar-pedido',
  templateUrl: './dialog-finalizar-pedido.component.html',
  styleUrls: ['./dialog-finalizar-pedido.component.css']
})
export class DialogFinalizarPedidoComponent implements OnInit {

  itensCarrinho: Product[] = [];
  totalPedido: number = 0;
  enderecoSelecionado: Address;
  pagamentoSelecionado: MetodoPagamento;
  observacao: string = "";
  valorDinheiro: number = 0;

  ObservacaoForm: FormGroup = this.formBuilder.group({
    'description': ['', []]
  });

  constructor(private carrinhoService: carrinhoService, private formBuilder: FormBuilder) {
    this.itensCarrinho = carrinhoService.itensCarrinho;
    this.totalPedido = carrinhoService.totalPedido;
    this.enderecoSelecionado = carrinhoService.enderecoSelecionado;
    this.pagamentoSelecionado = carrinhoService.pagamentoSelecionado;
    this.valorDinheiro = carrinhoService.valorDinheiro;

   }

  ngOnInit(): void {
    console.log(this.itensCarrinho);
    
  }

  finalizarPedido(){
    this.carrinhoService.exportarPedido(this.observacao);
  }

}
