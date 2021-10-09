import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Items } from '../items.model';
import { Order } from '../order.model';
import { orderService } from '../order.service';

export interface idUser {
  id: number
}

@Component({
  selector: 'app-dialog-historico',
  templateUrl: './dialog-historico.component.html',
  styleUrls: ['./dialog-historico.component.css']
})
export class DialogHistoricoComponent implements OnInit {
  pedidos: Order[] = [];
  data = new Date();

  constructor(public dialogRef: MatDialogRef<DialogHistoricoComponent>,
    @Inject(MAT_DIALOG_DATA) public id: idUser, public orderService: orderService) { }

  ngOnInit(): void {
    this.orderService.getOrdersByUserInDate(this.id.id)
      .subscribe(
        (res => this.pedidos = res),
        (err => console.log(err))
      );
      
  }


lerItens(pedido: Order): Items[]{
  return pedido.items;
}

lerAdicionais(item: Items): string{
  let adicionaisString: string = "";
  let primeiro: boolean = true;
  item.additionalPedidos.forEach(item => {
    if(primeiro){
      adicionaisString = adicionaisString + `${item.additional.name} (${item.quantity})`;
      primeiro = false;
    }else {
      adicionaisString = adicionaisString + `, ${item.additional.name} (${item.quantity})`;
    }
  })

  return adicionaisString;
  

}

}
