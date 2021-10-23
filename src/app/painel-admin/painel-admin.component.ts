import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-painel-admin',
  templateUrl: './painel-admin.component.html',
  styleUrls: ['./painel-admin.component.css']
})
export class PainelAdminComponent implements OnInit {

  panelOpenState = false;
  iconeMenu:String = "expand_more";
  contador:number;
  content:String="painel-pedidos";

  constructor(private router: Router) { }

  ngOnInit(): void {
    let parametro = window.location.search;
    parametro = parametro.replace('?','');
    parametro = parametro.replace('=','');
    
    if(parametro === "newProduct"){
      this.content= "novo-produto";
    }

    if(parametro === "newMetodoPagamento"){
      this.content= "novos-metodos-pagamentos";
    }

    if(parametro === "newBairro"){
      this.content= "novo-bairro";
    }

    
    
  }


  
  contentInfo():void{
    this.content="info";
  }

  contentNovoProduto():void{
    this.content="novo-produto";
  }

  contentEditarProduto():void{
    this.content="editar-produto";
  }

  contentCategorias():void{
    this.content="categorias";
  }

  contentBairros():void{
    this.content="bairros";
  }

  contentNovoBairro():void{
    this.content="novo-bairro";
  }

  contentEditarBairro():void{
    this.content="editar-bairro";
  }

  contentPersonalizacao():void{
    this.content="personalizacao";
  }

  contentPainelPedido():void{
    this.content="Painel de Pedidos";
  }

  contentMetodosPagamentos():void{
    this.content="metodos-pagamentos";
  }

  contentNewMetodosPagamentos(){
    this.content="novos-metodos-pagamentos";
  }

  contentEditMetodosPagamentos(){
    this.content="editar-metodos-pagamentos";
  }

  contentAdicionais(){
    this.content = "adicionais";
  }

  contentPainelPedidos(){
    this.content = "painel-pedidos"
  }

}
