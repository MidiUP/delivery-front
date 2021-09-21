import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Adicional } from 'src/app/novo-produto/adicional.model';
import { Product } from 'src/app/novo-produto/product.model';

@Component({
  selector: 'app-dialog-editar-produto',
  templateUrl: './dialog-editar-produto.component.html',
  styleUrls: ['./dialog-editar-produto.component.css']
})
export class DialogEditarProdutoComponent implements OnInit {

  adicionais: Adicional[] = [];

  constructor(public dialogRef: MatDialogRef<DialogEditarProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public produto: Product) { }

    

  ngOnInit(): void {

  }

  addAdicional(){
    let adicional : Adicional = new Adicional("",0,"",0,0);
    this.adicionais.push(adicional);
  }

  removeAdicional(){
    this.adicionais.pop()
  }

}
