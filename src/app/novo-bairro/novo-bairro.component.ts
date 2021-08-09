import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bairro } from './bairro.model';
import { bairroService } from './bairro.service';

@Component({
  selector: 'app-novo-bairro',
  templateUrl: './novo-bairro.component.html',
  styleUrls: ['./novo-bairro.component.css']
})
export class NovoBairroComponent implements OnInit {
  
  novoBairroForm: FormGroup;
  bairro = new Bairro("",0,0,"");
  bairros: Bairro[];

  constructor(private formBuilder: FormBuilder,
    private bairroService: bairroService) { }

  ngOnInit(): void {

    

    this.novoBairroForm = new FormGroup({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      deliveryTime: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      taxa: this.formBuilder.control('', [Validators.required, Validators.min(1)])   
      }, { updateOn: 'change' });
  }

  onSubmit(){
    this.bairroService.createBairro(this.bairro)  
      .subscribe(
        (res) => {
          console.log("bairro cadastrado");
        },
        (err) => {
          console.log(err);
          console.log(this.bairro);
        }
      )
  }

  getBairros(): void {
    this.bairroService.getBairros()
      .subscribe(
        data => {
          this.bairros = data;
        }
      )
  }
}
