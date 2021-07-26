import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from './address.model'; 

@Component({
  selector: 'app-adicionar-endereco',
  templateUrl: './adicionar-endereco.component.html',
  styleUrls: ['./adicionar-endereco.component.css']
})
export class AdicionarEnderecoComponent implements OnInit {

  endereco: Address;

  addressForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router) {    
   }

  ngOnInit(): void {   
      this.addressForm = new FormGroup({
      street: this.formBuilder.control('', [Validators.required]),
      neighborhood: this.formBuilder.control('', [Validators.required]),
      number: this.formBuilder.control('', [Validators.required]),
      complement: this.formBuilder.control('', [Validators.required]),
      city: this.formBuilder.control('', [Validators.required]),
      cep: this.formBuilder.control('', [Validators.required])
    }, {updateOn: 'change'});
  }

  salvarEndereco(endereco: Address): void {
    console.log(endereco);    
  }

  cancel(){
    this.router.navigate(['/'])
  }
}
