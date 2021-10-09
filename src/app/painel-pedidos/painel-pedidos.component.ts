import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { additionalPedidos, Items } from '../home/items.model';
import { Order } from '../home/order.model';
import { orderService } from '../home/order.service';
import { Product } from '../novo-produto/product.model';
import { DialogPedidoComponent } from './dialog-pedido/dialog-pedido.component';

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



  constructor(private orderService: orderService, public dialog: MatDialog) { }

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
  
      pedido.user = { id: pedido.user.id, name: '', username: '', email: '', password: '', cpf: '', rg: '', phone: '' };
      pedido.status = { id: newStatus, description: '' };

    this.orderService.putOrder(pedido, pedido.id)
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


    openDialog( order: Order ) {
      const dialogRef = this.dialog.open(DialogPedidoComponent, {
        data: { id: order.id, address: order.address, items: order.items, note: order.note, paymentMethod: order.paymentMethod, status: order.status, total: order.total, user: order.user }
      });
    }

    lerAdicionais(adicionais: additionalPedidos[]): string {
  
      let adicionaisString: string = "";
      let primeiro: boolean = true;

      adicionais.forEach(item => {
        if(primeiro){
          adicionaisString = adicionaisString + `${item.additional.name} (${item.quantity})`;
          primeiro = false;
        } else {
          adicionaisString = adicionaisString + `, ${item.additional.name} (${item.quantity})`;
        }
      })
      
      if(adicionaisString !== ""){
        return adicionaisString;
      }else{
        return ""
      }
    }
  

  imprimir(pedido: Order) {
    let data = new Date();

    let popupWin = window.open('', '_blank', 'width=800,height=500,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no,top=50');
    popupWin?.window.focus();
    popupWin?.document.open();
    popupWin?.document.write(
      
      '<!DOCTYPE html>'
      +'<html lang="pt-br">'
      
      +'<head>'
      +'<!-- Meta tags Obrigatórias -->'
          +'<meta charset="utf-8">'
          +'<meta name="viewport" content="width=300px, initial-scale=1, shrink-to-fit=no">'
      
          +'<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"'
          +'integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">'
      
              +'<style type="text/css">'
          +'body {'
              +'width: 300px;'
                  +'background: white;'
                  +'}'
      
              +'.nota {'
              +'background: white;'
                  +'display: flex;'
                  +'flex-direction: row;'
                  +'justify-content: center;'
                  +'align-items: center;'
                  +'padding: 0px 0px 0px 0px;'
                  +'}'
      
              +'.notaColumn {'
              +'background: white;'
                  +'display: flex;'
                  +'flex-direction: column;'
                  +'justify-content: center;'
                  +'align-items: center;'
                  +'padding: 0px 0px 0px 0px;'
                  +'}'
    
              +'.infos{'
              +'display: flex;'
                  +'width: 100%;'
                  +'flex-direction: row;'
                  +'justify-content: space-between;'
    
                  +'}'
      
      
              +'h3 {'
      
              +'font-size: 11px;'
                  +'margin: 0px 0px 0px 5px;'
                  +'text-transform: uppercase;'
                  +'font-weight: bold;'
                  +'}'
      
              +'p {'
              +'font-size: 13px;'
                  +'margin: 0px 0px 0px 5px;'
                  +'text-transform: uppercase;'
                  +'}'
      
              +'hr {'
      
              +'border: none;'
                  +'border-top: 2px dotted black;'
                  +'color: #fff;'
                  +'background-color: #fff;'
                  +'height: 1px;'
                  +'margin: 8px 0px;'
      
                  +'}'
              
              +'</style>'
    
          +'<title>Imprimir Pedido</title>'
          +'</head>'
      
      
      +'<!-- onload=window.print(); window.close(); -->'
      +'<body onload="window.print(); window.close();" style="padding: 0px 5px;">'
      +'<header class="container nota">'
              +'<img src="data:image/png;base64,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" width="60px" height="60px">'
              +'<div>'
              +'<h3>Nome do Estabelecimento</h3>'
                  +'<h3> Av. Miguel Couto, 2395 - Teresina</h3>'
                  +'<h3> cnpj: 50.432.057/0001-38</h3>'
                  +'</div>'
              +'</header>'
      
          +'<hr>'
    
          +'<section class="container nota">'
          +'<h3> pedido: #' + pedido.id + '</h3>'
              +'</section>'
          
          +'<hr>'
    
      
      
          + this.itensPedidoImpressao(pedido.items) 
          

      
      
          +'<hr>'
      
          +'<section class="container nota">'
          +'<h3> observações: ' + this.isNote(pedido) + '</h3>'
              +'</section>'
      
          +'<hr>'
      
      
      
      
      
      
          +'<section class="container notaColumn">'
          +'<div class="infos">'
              +'<h3>Taxa de Entrega: </h3> <h3>R$ ' + pedido.total.toFixed(2).replace('.', ',') + '</h3>'
                  +'</div>'
          +'<div class="infos">'
              +'<h3>Valor Total: </h3> <h3>R$ ' + pedido.total.toFixed(2).replace('.', ',') + '</h3>'
                  +'</div>'
              +'<div class="infos">'
              +'<h3>forma de pagamento: </h3> <h3>' + pedido.paymentMethod + '</h3>'
                  +'</div>'
              +'</section>'
      
          +'<hr>'
      
      
          +'<section class="container notaColumn">'
          +'<h3> cliente cpf: ' + pedido.user.cpf + '</h3>'
              +'<h3>' + pedido.user.name + '</h3>'
              +'<h3>' + pedido.address + '</h3>'
              // +'<h3> ao lado do colégio são José</h3>'
              +' </section>'
      
          +'<hr>'
      
          +'<section class="container notaColumn">'
          +'<h3> emissão: ' + data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear() + '-' + data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds() + '</h3>'
              +'</section>'
      
          +'</body>'
      
       +'</html>'

);
    popupWin?.document.close();


  }

  isNote(pedido: Order): string {
    if(pedido.note !== undefined){
      return pedido.note;
    }else {
      return ''
    }
  }

  calcularValorItem(item: Items): number{
    let total = 0;
    let precoAdicionais = 0;
    item.additionalPedidos.forEach(item => {
      precoAdicionais = precoAdicionais + (item.additional.price * item.quantity);
    })
    total = (item.product.price + precoAdicionais) * item.quantityProduct
    return total;
  }


  itensPedidoImpressao(itens: Items[]): string {
    let stringItens: string = '';

    itens.forEach(item => {
      stringItens = stringItens +'<section class="container notaColumn" style="margin-bottom: 7px;">'
      +'<div class="infos">'
          +'<div class="produto">'
              +'<h3>' + item.product.name + '('+ item.quantityProduct +')' + '</h3>'
                  + '<h3>' + this.lerAdicionais(item.additionalPedidos) + '<h3>'
                  +'</div>'
              +'<h3>valor: R$' + this.calcularValorItem(item).toFixed(2).replace('.', ',') + '</h3>'
              +'</div>'
          +'</section>'
    })

  // itensPedidoImpressao(itens: Items[]): string {
  //   let stringItens: string = '';

  //   itens.forEach(item => {
  //     stringItens = stringItens +'<section class="container notaColumn" style="margin-bottom: 7px;">'
  //     +'<div class="infos">'
  //         +'<div class="produto">'
  //             +'<h3>' + item.product.name + '('+ item.quantityProduct +')' + '</h3>'
  //                 +'<h3>cheddar(2x), Coca lata(3x)</h3>'
  //                 +'</div>'
  //             +'<h3>valor: R$' + item.product.price.toFixed(2).replace('.', ',') + '</h3>'
  //             +'</div>'
  //         +'</section>'
  //   })
    
    
    
    return stringItens;
    
    // +'<section class="container notaColumn" style="margin-bottom: 7px;">'
    // +'<div class="infos">'
    //     +'<div class="produto">'
    //         +'<h3>x-tudo</h3>'
    //             +'<h3>cheddar(2x), Coca lata(3x)</h3>'
    //             +'</div>'
    //         +'<h3>valor: R$10,00</h3>'
    //         +'</div>'
    //     +'</section>'
  }





}
