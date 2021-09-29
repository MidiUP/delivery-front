import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { filter, map } from 'rxjs/operators';
import { Adicional } from '../novo-produto/adicional.model';
import { AdicionalService } from './adicional.service';
import { DialogCriarAdicionalComponent } from './dialog-criar-adicional/dialog-criar-adicional.component';
import { DialogDeleteAdicionalComponent } from './dialog-delete-adicional/dialog-delete-adicional.component';
import { DialogEditarAdicionalComponent } from './dialog-editar-adicional/dialog-editar-adicional.component';

@Component({
  selector: 'app-adicionais',
  templateUrl: './adicionais.component.html',
  styleUrls: ['./adicionais.component.css']
})
export class AdicionaisComponent implements OnInit {

  pesquisaName = new FormControl();
  adicionais: Adicional[] = [];

  constructor(private adicionalService: AdicionalService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAdicionais();
  }

  getAdicionais() {
    this.adicionalService.getAdicionals()
      .subscribe(data => this.adicionais = data);
  }

  openDialogAddAdicional(){
      const dialogRef = this.dialog.open(DialogCriarAdicionalComponent, {
        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getAdicionais();
      });
    
    
  }

  openDialogEditAdicional(adicional: Adicional){
    const dialogRef = this.dialog.open(DialogEditarAdicionalComponent, {
      data: {name: adicional.name, description: adicional.description, price: adicional.price, id: adicional.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAdicionais();
    });
  
  
}

openDialogDeleteAdicional(adicional: Adicional){
  const dialogRef = this.dialog.open(DialogDeleteAdicionalComponent, {
    data: {name: adicional.name, description: adicional.description, price: adicional.price, id: adicional.id}
  });

  dialogRef.afterClosed().subscribe(result => {
    this.getAdicionais();
  });


}


}
