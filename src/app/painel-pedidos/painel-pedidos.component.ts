import { Component, OnInit } from '@angular/core';
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
  audio = new Audio('../../assets/audio/alert.mp3');
  filtro: string = "Todos os Pedidos";
  mute: boolean = false;
  corIconeMute: string = 'primary';



  constructor(private orderService: orderService) { }

  ngOnInit(): void {
    this.getPedidosByDate();
    setInterval(() => this.filtroPedidos(this.filtro), 60000);
  }



  getPedidos(): void {
    this.orderService.getOrders()
      .subscribe(
        data => {
          this.pedidos = data;
        }
      )
  }

  getPedidosByDate(): void {
    this.filtro = "Todos os Pedidos"
    this.orderService.getOrdersByDate()
      .subscribe(
        data => {
          this.pedidos = data;
          this.alerta();
        }
      )
  }



  tratarVetor(pedido: Order) {
    return pedido.items;
  }

  colorHeader(pedido: Order): string {
    if (pedido.status.description === "Novo Pedido") {
      return 'background: red';
    } else if (pedido.status.description === "Em Preparo") {
      return 'background: orange';
    } else if (pedido.status.description === "Saiu para Entrega") {
      return 'background: #00BFFF'
    } else {
      return 'background: #32CD32'
    }
  }

  alterarStatus(newStatus: number, pedido: Order) {
    let pedidoAualizado: Order = {
      id: pedido.id,
      user: { id: pedido.user.id, name: '', username: '', email: '', password: '', cpf: '', rg: '', phone: '' },
      paymentMethod: pedido.paymentMethod,
      address: pedido.address,
      status: { id: newStatus, description: '' },
      total: pedido.total,
      coupon: { id: pedido.coupon.id, name: '', value: 0 },
      items: pedido.items
    };
    this.orderService.putOrder(pedidoAualizado, pedido.id)
      .subscribe(
        (res => {
          console.log("status alterado");
          if (this.filtro !== 'Todos os Pedidos') {
            this.filtroPedidos(this.filtro);
          } else {
            this.getPedidosByDate();
          }
        }),
        (err => console.log(err))
      )
  }

  alerta() {
    let loop: boolean = true;
    this.pedidos.forEach(item => {
      if (item.status.description === "Novo Pedido" && loop === true && this.mute !== true) {
        this.audio.play();
        loop = false;
      }
    })
  }

  filtroPedidos(filtro: string) {
    if (filtro !== "Todos os Pedidos") {
      this.filtro = filtro;
      let pedidosFiltrados: Order[] = [];
      let pedidosEmAberto: Order[] = [];
      this.orderService.getOrdersByDate()
        .subscribe(
          data => {
            data.forEach(item => {
              if (item.status.description === "Novo Pedido") {
                pedidosEmAberto.push(item);
              }
              if (item.status.description === filtro) {
                pedidosFiltrados.push(item);
              }
            });
            if (pedidosEmAberto.length > 0) {
              this.filtro = "Novo Pedido";
              this.pedidos = pedidosEmAberto;
              if (!this.mute) {
                this.audio.play();
              }
            } else {
              this.pedidos = pedidosFiltrados;
            }
          }
        )
    } else {
      this.getPedidosByDate();
    }
  }

  iconVolume(): string {
    if (this.mute) {
      return 'volume_off';
    } else {
      return 'volume_up';
    }
  }

  alternarVolume() {
    this.mute = !this.mute;
    if (this.mute) {
      this.corIconeMute = 'warn';
    } else {
      this.corIconeMute = 'primary';
    }
  }

  whatsappCliente(whatsapp: string) {
    window.open(`https://api.whatsapp.com/send?phone=55${whatsapp}`);
  }



}
