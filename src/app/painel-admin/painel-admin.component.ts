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
  content:String="novo-produto";

  constructor() { }

  ngOnInit(): void {
    
  }

  icone(): String{
    this.contador=1;
    if(this.contador%2!=0){
      return "expand_more"

    }else{
      return "expand_less"
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


}
