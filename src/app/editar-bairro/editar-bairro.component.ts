import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaErrorComponent } from '../alerta-error/alerta-error.component';
import { AlertaSuccesComponent } from '../alerta-succes/alerta-succes.component';
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
  bairro: Bairro = new Bairro("",0,0,"",true);
  constructor(private bairroService: bairroService,
    private formBuilder: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getBairros();

    this.editBairroForm = new FormGroup({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      value: this.formBuilder.control('', [Validators.required]), 
      deliveryTime: this.formBuilder.control('', [])
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
          this.openSnackBarSuccess();
        },
        (err) => {
          this.openSnackBarError();
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
