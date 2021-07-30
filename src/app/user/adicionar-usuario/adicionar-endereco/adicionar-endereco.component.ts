import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/user/user.model';
import { Address } from 'src/app/user/adicionar-usuario/adicionar-endereco/address.model';

@Component({
  selector: 'app-adicionar-endereco',
  templateUrl: './adicionar-endereco.component.html',
  styleUrls: ['./adicionar-endereco.component.css']
})
export class AdicionarEnderecoComponent implements OnInit {

  @Input() openPanelAddress: boolean;
  @Output() changeOpenPanelAddress = new EventEmitter();

  user_?:User= new User("", "", "", "", "", "", new Address("", "", "", "", "", ""), undefined);

  endereco: Address;

  addressForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router:Router) { 
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

    console.log(this.openPanelAddress);
    
  }

  updateUserProperties(data:User){
    this.user_ = data;
  }

  salvarEndereco(endereco: Address): void {
    console.log(this.user_);    
  }

  cancel(){
    this.openPanelAddress = !this.openPanelAddress;
    this.changeOpenPanelAddress.emit(this.openPanelAddress);
  }
}
