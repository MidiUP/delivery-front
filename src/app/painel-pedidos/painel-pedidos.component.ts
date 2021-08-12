import { Component, OnInit } from '@angular/core';
import { Items } from '../home/items.model';
import { Order } from '../home/order.model';
import { orderService } from '../home/order.service';

@Component({
  selector: 'app-painel-pedidos',
  templateUrl: './painel-pedidos.component.html',
  styleUrls: ['./painel-pedidos.component.css']
})
export class PainelPedidosComponent implements OnInit {

  pedidos: Order[];
  teste: number[] = [1,2,3];
  pedidosAberto: Order[];

  constructor(private orderService: orderService) { }

  ngOnInit(): void {
    this.getPedidosByDate();
    setInterval(() => this.getPedidos(), 60000)
  }

  chamar(){
    this.getPedidosByDate();
  }


  getPedidos(): void{
    this.orderService.getOrders()
      .subscribe(
        data =>{
          this.pedidos=data;
        }
      )
  }

  getPedidosByDate(): void{
    this.orderService.getOrdersByDate()
      .subscribe(
        data => {
          this.pedidos=data;
        }
      )
  }



  tratarVetor (pedido: Order){
    return pedido.items;
  }
}
