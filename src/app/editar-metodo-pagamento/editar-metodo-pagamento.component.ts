import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MetodoPagamento } from '../metodo-pagamento/metodoPagamento.model';
import { metodoPagamentoService } from '../metodo-pagamento/metodoPagamento.service';

@Component({
  selector: 'app-editar-metodo-pagamento',
  templateUrl: './editar-metodo-pagamento.component.html',
  styleUrls: ['./editar-metodo-pagamento.component.css']
})
export class EditarMetodoPagamentoComponent implements OnInit {

  metodo: MetodoPagamento = new MetodoPagamento(0,"");
  metodos: MetodoPagamento[] = [];
  editMetodoForm: FormGroup;

  constructor(private metodoPagamentoService: metodoPagamentoService,
      private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getMetodos();

    this.editMetodoForm = new FormGroup({
      description: this.formBuilder.control('', [Validators.required, Validators.minLength(2)])
      }, { updateOn: 'change' });
  }

  onSubmit(){
    this.metodoPagamentoService.putMetodoPagamento(this.metodo,this.metodo.id)  
      .subscribe(
        (res => {
          console.log("alterou");
        }),
        (err => {
          console.log(err);
        })
      )
  }

  getMetodos(){
    this.metodoPagamentoService.getMetodosPagamentos()
      .subscribe(
        (data => {
          this.metodos=data;
        })
      )
  }
}
