import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MetodoPagamento } from '../metodo-pagamento/metodoPagamento.model';
import { metodoPagamentoService } from '../metodo-pagamento/metodoPagamento.service';

@Component({
  selector: 'app-novo-metodo-pagamento',
  templateUrl: './novo-metodo-pagamento.component.html',
  styleUrls: ['./novo-metodo-pagamento.component.css']
})
export class NovoMetodoPagamentoComponent implements OnInit {

  novoMetodoForm: FormGroup;
  pagamento: MetodoPagamento = new MetodoPagamento(0,"");

  constructor(private formBuilder: FormBuilder,
              private metodoPagamentoService: metodoPagamentoService) { }

  ngOnInit(): void {

    this.novoMetodoForm = new FormGroup({
      description: this.formBuilder.control('', [Validators.required, Validators.minLength(2)])
      }, { updateOn: 'change' });
  }

  onSubmit(){
    this.metodoPagamentoService.createMetodoPagamento(this.pagamento)
      .subscribe(
        (res => {
          console.log("cadastrou");
        }),
        (err => {
          console.log(err);
        })
      )
  }





  }


