import { Component, OnInit } from '@angular/core';
import { MetodoPagamento } from './metodoPagamento.model';
import { metodoPagamentoService } from './metodoPagamento.service';

@Component({
  selector: 'app-metodo-pagamento',
  templateUrl: './metodo-pagamento.component.html',
  styleUrls: ['./metodo-pagamento.component.css']
})
export class MetodoPagamentoComponent implements OnInit {

  metodos: MetodoPagamento[];

  constructor(private metodoPagamentoService: metodoPagamentoService) { }

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

}
