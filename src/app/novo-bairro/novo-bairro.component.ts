import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaErrorComponent } from '../alerta-error/alerta-error.component';
import { AlertaSuccesComponent } from '../alerta-succes/alerta-succes.component';
import { Bairro } from './bairro.model';
import { bairroService } from './bairro.service';

@Component({
  selector: 'app-novo-bairro',
  templateUrl: './novo-bairro.component.html',
  styleUrls: ['./novo-bairro.component.css']
})
export class NovoBairroComponent implements OnInit {
  
  novoBairroForm: FormGroup;
  bairro = new Bairro("",0,0,"",true);
  bairros: Bairro[];

  constructor(private formBuilder: FormBuilder,
              private bairroService: bairroService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    

    this.novoBairroForm = new FormGroup({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      deliveryTime: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      taxa: this.formBuilder.control('', [Validators.required, Validators.min(1)]),
      isEnable: this.formBuilder.control('', [Validators.required])     
      }, { updateOn: 'change' });
  }

  onSubmit(){
    this.bairroService.createBairro(this.bairro)  
      .subscribe(
        (res) => {
          this.openSnackBarSuccess();
          window.location.href= "/admin?newBairro"
        },
        (err) => {
          this.openSnackBarError();
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

  openSnackBarSuccess() {
    this._snackBar.openFromComponent(AlertaSuccesComponent, {
      duration: 5000,
    });
  }

  openSnackBarError() {
    this._snackBar.openFromComponent(AlertaErrorComponent, {
      duration: 5000,
    });
  }
}
