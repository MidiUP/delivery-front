import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empresa } from './empresa.model';
import { EmpresaService } from './empresa.service';

@Component({
  selector: 'app-info-empresa',
  templateUrl: './info-empresa.component.html',
  styleUrls: ['./info-empresa.component.css']
})
export class InfoEmpresaComponent implements OnInit {

  infoEmpresaForm: FormGroup;
  empresa = new Empresa("","","","","","","",0,"");
  

  constructor(private formBuilder: FormBuilder,
    private empresaService: EmpresaService) { }

  ngOnInit(): void {

    this.infoEmpresaForm = new FormGroup({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      slogan: this.formBuilder.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      cnpj: this.formBuilder.control('', [Validators.required,]),
      endereco: this.formBuilder.control('', [Validators.required, Validators.minLength(10)]),
      telefone: this.formBuilder.control('', [Validators.required,]),
      whatsapp: this.formBuilder.control('', [Validators.required,]),
      linkGoogleMaps: this.formBuilder.control('', [Validators.required, Validators.minLength(10)])
    }, { updateOn: 'change' });
  }

  onSubmit(){
    this.empresaService.createEmpresa(this.empresa)
      .subscribe(
        (res) => {
          console.log("Empresa cadastrada");
        },
        (err) => {
          console.log(err);
        }
      )
  }
}
