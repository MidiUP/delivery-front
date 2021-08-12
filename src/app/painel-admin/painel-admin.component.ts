import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    
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


}
