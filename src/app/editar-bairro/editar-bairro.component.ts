import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bairro } from '../novo-bairro/bairro.model';
import { bairroService } from '../novo-bairro/bairro.service';

@Component({
  selector: 'app-editar-bairro',
  templateUrl: './editar-bairro.component.html',
  styleUrls: ['./editar-bairro.component.css']
})
export class EditarBairroComponent implements OnInit {
  editBairroForm: FormGroup;
  bairros: Bairro[];
  bairro: Bairro = new Bairro("",0,0,"");
  constructor(private bairroService: bairroService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getBairros();

    this.editBairroForm = new FormGroup({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      value: this.formBuilder.control('', [Validators.required, Validators.min(1)]), 
      deliveryTime: this.formBuilder.control('', [Validators.required, Validators.minLength(5)])
      }, { updateOn: 'change' });

  }

  getBairros(): void {
    this.bairroService.getBairros()
      .subscribe(
        data => {
          this.bairros = data;
        }
      )
  }

  onSubmit(){
    this.bairroService.putBairro(this.bairro, this.bairro.id)
      .subscribe(
        (res) => {
          console.log("Bairro Alterado");
        },
        (err) => {
          console.log(err);
        }
      )
  }
}
