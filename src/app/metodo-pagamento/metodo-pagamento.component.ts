import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteMetodoPagamentoComponent } from './dialog-delete-metodo-pagamento/dialog-delete-metodo-pagamento.component';
import { MetodoPagamento } from './metodoPagamento.model';
import { metodoPagamentoService } from './metodoPagamento.service';

@Component({
  selector: 'app-metodo-pagamento',
  templateUrl: './metodo-pagamento.component.html',
  styleUrls: ['./metodo-pagamento.component.css']
})
export class MetodoPagamentoComponent implements OnInit {

  metodos: MetodoPagamento[];

  constructor(private metodoPagamentoService: metodoPagamentoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getBairros();
  }

  getBairros(): void {
    this.metodoPagamentoService.getMetodosPagamentos()
      .subscribe(
        data => {
          this.metodos = data;
        }
      )
  }

  openDialogDelete(id: number){
    const dialogRef = this.dialog.open(DialogDeleteMetodoPagamentoComponent, {
      data: {id: id}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getBairros();
    });
  }

}
