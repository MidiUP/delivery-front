import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { additionalPedidos, Items } from '../home/items.model';
import { Order } from '../home/order.model';
import { orderService } from '../home/order.service';
import { Empresa } from '../info-empresa/empresa.model';
import { EmpresaService } from '../info-empresa/empresa.service';
import { Product } from '../novo-produto/product.model';
import { DialogPedidoComponent } from './dialog-pedido/dialog-pedido.component';
import * as moment from 'moment';


@Component({
  selector: 'app-painel-pedidos',
  templateUrl: './painel-pedidos.component.html',
  styleUrls: ['./painel-pedidos.component.css']
})
export class PainelPedidosComponent implements OnInit, OnDestroy {

  pedidos: Order[];
  status: string;
  audio = new Audio('../../assets/audio/alert.mp3');
  filtro: string = "Todos os Pedidos";
  mute: boolean = false;
  corIconeMute: string = 'primary';
  intervalo: any;
  empresa: Empresa = new Empresa(0, "", "", "", "", "", "", "", "", true, [], "", "", 0);

  

  range: FormGroup = this.formBuilder.group({
    'start': [`${new Date()}`, [Validators.required]],
    'end': [`${new Date()}`, [Validators.required]]
  });



  constructor(private orderService: orderService, public dialog: MatDialog, private empresaService: EmpresaService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getPedidosByDate(true);
    this.intervalo = setInterval(() => this.filtroPedidos(this.filtro, true), 60000);
    this.getEmpresa();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }

  getPedidos(): void {
    this.orderService.getOrders()
      .subscribe(
        data => {
          this.pedidos = data;
        }
      )
  }

  getPedidosByDate(tocar: boolean): void {

    let dataInicial: moment.Moment = moment.utc(this.range.value.start);
    let dataFinal: moment.Moment = moment.utc(this.range.value.end);
    this.range.value.start = dataInicial.format("YYYY-MM-DD");
    this.range.value.end = dataFinal.format("YYYY-MM-DD");

    this.filtro = "Todos os Pedidos"
    this.orderService.getOrdersByDates(this.range.value.start, this.range.value.end)
      .subscribe(
        data => {
          this.pedidos = data;
          if (tocar) {
            this.alerta();
          }
        }
      )
  }

  getEmpresa() {
    this.empresaService.getEmpresaById()
      .subscribe(data => this.empresa = data)
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
    } else if (pedido.status.description === "Pedido Entregue") {
      return 'background: #32CD32';
    } else {
      return 'background: #565656';
    }
  }

  alterarStatus(newStatus: number, pedido: Order) {

    pedido.user = { id: pedido.user.id, name: '', email: '', password: '', cpf: '', phone: '' };
    pedido.status = { id: newStatus, description: '' };

    this.orderService.setStatusOrder(pedido.id, newStatus)
      .subscribe(
        (res => {
          if (this.filtro !== 'Todos os Pedidos') {
            this.filtroPedidos(this.filtro, false);
          } else {
            this.getPedidosByDate(false);
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


  filtroPedidos(filtro: string, tocar: boolean) {

    let dataInicial: moment.Moment = moment.utc(this.range.value.start);
    let dataFinal: moment.Moment = moment.utc(this.range.value.end);
    this.range.value.start = dataInicial.format("YYYY-MM-DD");
    this.range.value.end = dataFinal.format("YYYY-MM-DD");


    if (filtro !== "Todos os Pedidos") {
      this.filtro = filtro;
      let pedidosFiltrados: Order[] = [];
      let pedidosEmAberto: Order[] = [];
      this.orderService.getOrdersByDates(this.range.value.start, this.range.value.end)
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
              if (!this.mute && tocar) {
                this.audio.play();
              }
            } else {
              this.pedidos = pedidosFiltrados;
            }
          }
        )
    } else {
      this.getPedidosByDate(true);
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


  openDialog(order: Order) {
    const dialogRef = this.dialog.open(DialogPedidoComponent, {
      data: { id: order.id, address: order.address, items: order.items, note: order.note, paymentMethod: order.paymentMethod, status: order.status, total: order.total, user: order.user }
    });
  }

  lerAdicionais(adicionais: additionalPedidos[], adicionaisObrigatorios: additionalPedidos[]): string {

    let adicionaisString: string = "";
    let primeiro: boolean = true;

    adicionaisObrigatorios.forEach(item => {
      if (primeiro) {
        adicionaisString = adicionaisString + `${item.additional.name} (${item.quantity})`;
        primeiro = false;
      } else {
        adicionaisString = adicionaisString + `, ${item.additional.name} (${item.quantity})`;
      }
    })

    adicionais.forEach(item => {
      if (primeiro) {
        adicionaisString = adicionaisString + `${item.additional.name} (${item.quantity})`;
        primeiro = false;
      } else {
        adicionaisString = adicionaisString + `, ${item.additional.name} (${item.quantity})`;
      }
    })

    if (adicionaisString !== "") {
      return adicionaisString;
    } else {
      return ""
    }
  }

  lerTroco(pedido: Order) {
    if (pedido.paymentMethod === "Dinheiro") {
      return '<div class="infos">'
        + '<h3>Troco para: </h3> <h3>' + 'R$' + pedido.thing?.toFixed(2).replace('.',',') + '</h3>'
        + '</div>'
    } else {
      return ""
    }
  }


  imprimir(pedido: Order) {
    let data = new Date();
    if (pedido.address === null) {
      pedido.address = "Retirada na Loja"
    }

    let popupWin = window.open('', '_blank', 'width=800,height=500,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no,top=50');
    popupWin?.window.focus();
    popupWin?.document.open();
    popupWin?.document.write(

      '<!DOCTYPE html>'
      + '<html lang="pt-br">'

      + '<head>'
      + '<!-- Meta tags Obrigatórias -->'
      + '<meta charset="utf-8">'
      + '<meta name="viewport" content="width=300px, initial-scale=1, shrink-to-fit=no">'

      + '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"'
      + 'integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">'

      + '<style type="text/css">'
      + 'body {'
      + 'width: 300px;'
      + 'background: white;'
      + '}'

      + '.nota {'
      + 'background: white;'
      + 'display: flex;'
      + 'flex-direction: row;'
      + 'justify-content: center;'
      + 'align-items: center;'
      + 'padding: 0px 0px 0px 0px;'
      + '}'

      + '.notaColumn {'
      + 'background: white;'
      + 'display: flex;'
      + 'flex-direction: column;'
      + 'justify-content: center;'
      + 'align-items: center;'
      + 'padding: 0px 0px 0px 0px;'
      + '}'

      + '.infos{'
      + 'display: flex;'
      + 'width: 100%;'
      + 'flex-direction: row;'
      + 'justify-content: space-between;'

      + '}'

      + '.infos-produto{'
      + 'display: flex;'
      + 'width: 100%;'
      + 'flex-direction: row;'


      + '}'


      + 'h3 {'

      + 'font-size: 11px;'
      + 'margin: 0px 0px 0px 5px;'
      + 'text-transform: uppercase;'
      + 'font-weight: bold;'
      + '}'

      + 'p {'
      + 'font-size: 13px;'
      + 'margin: 0px 0px 0px 5px;'
      + 'text-transform: uppercase;'
      + '}'

      + 'hr {'

      + 'border: none;'
      + 'border-top: 2px dotted black;'
      + 'color: #fff;'
      + 'background-color: #fff;'
      + 'height: 1px;'
      + 'margin: 8px 0px;'

      + '}'

      + '</style>'

      + '<title>Imprimir Pedido</title>'
      + '</head>'


      + '<!-- onload=window.print(); window.close(); -->'
      + '<body onload="window.print(); window.close();" style="padding: 0px 5px;">'
      + '<header class="container nota">'
      + '<img src="' + this.empresa.logoPath + '" width="60px" height="60px">'
      + '<div>'
      + '<h3>' + this.empresa.name + '</h3>'
      + '<h3>' + this.empresa.address + '</h3>'
      + '<h3> cnpj:' + this.empresa.cnpj + '</h3>'
      + '</div>'
      + '</header>'

      + '<hr>'

      + '<section class="container nota">'
      + '<h3> pedido: #' + pedido.id + '</h3>'
      + '</section>'

      + '<hr>'



      + this.itensPedidoImpressao(pedido.items)




      + '<hr>'

      + '<section class="container nota">'
      + '<h3> observações: ' + this.isNote(pedido) + '</h3>'
      + '</section>'

      + '<hr>'






      + '<section class="container notaColumn">'
      + '<div class="infos">'
      + '<h3>Taxa de Entrega: </h3> <h3>R$ ' + pedido.deliveryFee.toFixed(2).replace('.', ',') + '</h3>'
      + '</div>'
      + '<div class="infos">'
      + '<h3>Valor Total: </h3> <h3>R$ ' + pedido.total.toFixed(2).replace('.', ',') + '</h3>'
      + '</div>'
      + '<div class="infos">'
      + '<h3>forma de pagamento: </h3> <h3>' + pedido.paymentMethod + '</h3>'
      + '</div>'
      + this.lerTroco(pedido)
      + '</section>'

      + '<hr>'


      + '<section class="container notaColumn">'
      + '<h3> cliente cpf: ' + pedido.user.cpf + '</h3>'
      + '<h3>' + pedido.user.name + '</h3>'
      + '<h3 style="text-align: center;">' + pedido.address + '</h3>'
      // +'<h3> ao lado do colégio são José</h3>'
      + ' </section>'

      + '<hr>'

      + '<section class="container notaColumn">'
      + '<h3> emissão: ' + data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear() + '-' + data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds() + '</h3>'
      + '</section>'

      + '</body>'

      + '</html>'

    );
    popupWin?.document.close();


  }

  isNote(pedido: Order): string {
    if (pedido.note !== undefined) {
      return pedido.note;
    } else {
      return ''
    }
  }

  calcularValorItem(item: Items): number {
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
      stringItens = stringItens + '<section class="container notaColumn" style="margin-bottom: 7px;">'
        + '<div class="infos-produto" style="width: 100%;>'

        + '<div class="row" style="width: 100%">'
        + '<div class="col-7">'

        + '<div class="produto">'
        + '<h3>' + item.product.name + '(' + item.quantityProduct + ')' + '</h3>'
        + '<h3>' + this.lerAdicionais(item.additionalPedidos, item.additionalPedidosRequired) + '<h3>'
        + '</div>'

        + '</div>'

        + '<div class="col-5" style="padding-right: 0; display: flex; flex-direction: row; justify-content: end">'

        + '<h3 style="margin-left: auto; margin: 0; padding: 0">valor: R$' + this.calcularValorItem(item).toFixed(2).replace('.', ',') + '</h3>'

        + '</div>'


        + '</div>'

        + '</div>'
        + '</section>'
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
