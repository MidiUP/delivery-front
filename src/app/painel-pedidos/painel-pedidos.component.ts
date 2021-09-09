import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../home/order.model';
import { orderService } from '../home/order.service';

@Component({
  selector: 'app-painel-pedidos',
  templateUrl: './painel-pedidos.component.html',
  styleUrls: ['./painel-pedidos.component.css']
})
export class PainelPedidosComponent implements OnInit {

  pedidos: Order[];
  status: string;

  statusForm: FormGroup = this.formBuilder.group({
    'status': ['Status do Pedido', [Validators.required]]
  });

  constructor(private orderService: orderService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getPedidosByDate();
    setInterval(() => this.getPedidosByDate(), 60000)
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

  colorHeader(pedido: Order): string {
    if (pedido.status.description === "Novo Pedido") {
      return 'background: red';
    } else {
      return 'background: blue';
    }
  }

  alterarStatus(form: FormGroup, pedido: Order){
    pedido.status.id = parseInt(form.value.status);
    this.orderService.putOrder(pedido, pedido.id)
      .subscribe(
        (res => {
          console.log("status alterado");
        }),
        (err => console.log(err))
      )
  }
  
}
