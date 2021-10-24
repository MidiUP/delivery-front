import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaErrorComponent } from '../alerta-error/alerta-error.component';
import { AlertaSuccesComponent } from '../alerta-succes/alerta-succes.component';
import { Empresa } from './empresa.model';
import { EmpresaService } from './empresa.service';

@Component({
  selector: 'app-info-empresa',
  templateUrl: './info-empresa.component.html',
  styleUrls: ['./info-empresa.component.css']
})
export class InfoEmpresaComponent implements OnInit {

  infoEmpresaForm: FormGroup;
  empresa = new Empresa(0, "", "", "", "", "", "", "", "");
  isDraggingOverLogo: boolean = false;
  isDraggingOverBanner1: boolean = false;
  isDraggingOverBanner2: boolean = false;
  isDraggingOverBanner3: boolean = false;
  imagensLogo: FileList;
  imagensBanner01: FileList;
  imagensBanner02: FileList;
  imagensBanner03: FileList;
  existeIMagemLogo: boolean = false;
  existeIMagemBanner1: boolean = false;
  existeIMagemBanner2: boolean = false;
  existeIMagemBanner3: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private _snackBar: MatSnackBar) {
    this.empresaService.getEmpresaById()
      .subscribe(res => this.empresa = res);
  }

  ngOnInit(): void {

    this.infoEmpresaForm = new FormGroup({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      slogan: this.formBuilder.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      cnpj: this.formBuilder.control('', [Validators.required,]),
      endereco: this.formBuilder.control('', [Validators.required, Validators.minLength(10)]),
      telefone: this.formBuilder.control('', []),
      whatsapp: this.formBuilder.control('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      linkGoogleMaps: this.formBuilder.control('', [Validators.minLength(10)])
    }, { updateOn: 'change' });
  }


  onSubmit() {
    // this.empresaService.putEmpresa(this.empresa, 1)
    //   .subscribe(
    //     (res) => {
    //       console.log("Alterado");
    //     },
    //     (err) => {
    //       console.log(err);
    //       console.log(this.empresa)
    //     }
    //   )

    let formDataImagemLogo = new FormData;
    if (this.imagensLogo) {
      formDataImagemLogo.append('file', this.imagensLogo[0])
    }

    let formDataImagemBanner1 = new FormData;
    if (this.imagensBanner01) {
      formDataImagemBanner1.append('file', this.imagensBanner01[0])
    }

    let formDataImagemBanner2 = new FormData;
    if (this.imagensBanner02) {
      formDataImagemBanner2.append('file', this.imagensBanner02[0])
    }

    let formDataImagemBanner3 = new FormData;
    if (this.imagensBanner03) {
      formDataImagemBanner3.append('file', this.imagensBanner03[0])
    }

    this.empresaService.putEmpresa(this.empresa, 1)
      .subscribe(
        (res) => {
          this.openSnackBarSuccess();
          this.postarImagem(formDataImagemLogo, this.imagensLogo);
          this.postarBanner1(formDataImagemBanner1, this.imagensBanner01);
          this.postarBanner2(formDataImagemBanner2, this.imagensBanner02);
          this.postarBanner3(formDataImagemBanner3, this.imagensBanner03);
        },
        (err) => {
          this.openSnackBarError();
        }
      )
  }

  onDragOverEvent(event: DragEvent, isDraggingOver: string) {
    if(isDraggingOver === "isDraggingOverLogo"){
      this.isDraggingOverLogo = true;
    }

    if(isDraggingOver === "isDraggingOverBanner1"){
      this.isDraggingOverBanner1 = true;
    }

    if(isDraggingOver === "isDraggingOverBanner2"){
      this.isDraggingOverBanner2 = true;
    }

    if(isDraggingOver === "isDraggingOverBanner3"){
      this.isDraggingOverBanner3 = true;
    }
    event.preventDefault();
  }

  onDragLeaveEvent(event: DragEvent, isDraggingOver: string) {
    if(isDraggingOver === "isDraggingOverLogo"){
      this.isDraggingOverLogo = false;
    }

    if(isDraggingOver === "isDraggingOverBanner1"){
      this.isDraggingOverBanner1 = false;
    }

    if(isDraggingOver === "isDraggingOverBanner2"){
      this.isDraggingOverBanner2 = false;
    }

    if(isDraggingOver === "isDraggingOverBanner3"){
      this.isDraggingOverBanner3 = false;
    }
    event.preventDefault();
  }

  onDropEvent(event: DragEvent, controlador: string) {
    event.preventDefault();
    // imagens = event.dataTransfer?.files || new FileList;

    if(controlador == 'existeIMagemLogo'){
      this.existeIMagemLogo = true;
      this.imagensLogo = event.dataTransfer?.files || new FileList;
    }

    if(controlador == 'existeIMagemBanner1'){
      this.existeIMagemBanner1 = true;
      this.imagensBanner01 = event.dataTransfer?.files || new FileList;
    }

    if(controlador == 'existeIMagemBanner2'){
      this.existeIMagemBanner2 = true;
      this.imagensBanner02 = event.dataTransfer?.files || new FileList;
    }

    if(controlador == 'existeIMagemBanner3'){
      this.existeIMagemBanner3 = true;
      this.imagensBanner03 = event.dataTransfer?.files || new FileList;
    }


    
    // console.log(this.imagens[0].name);
  }

  postarImagem(formData: FormData, imagens: FileList) {
    if (imagens) {

      this.empresaService.postImage(formData)
        .subscribe(
          (res => {
            this.openSnackBarSuccess();
          }),
          (err => {
            console.log(err);
          })
        )
    }
  }

  postarBanner1(formData: FormData, imagens: FileList) {
    if (imagens) {

      this.empresaService.postBanner1(formData)
        .subscribe(
          (res => {
            this.openSnackBarSuccess();
          }),
          (err => {
            console.log(err);
          })
        )
    }
  }

  postarBanner2(formData: FormData, imagens: FileList) {
    if (imagens) {

      this.empresaService.postBanner2(formData)
        .subscribe(
          (res => {
            this.openSnackBarSuccess();
          }),
          (err => {
            console.log(err);
          })
        )
    }
  }

  postarBanner3(formData: FormData, imagens: FileList) {
    if (imagens) {

      this.empresaService.postBanner3(formData)
        .subscribe(
          (res => {
            this.openSnackBarSuccess();
          }),
          (err => {
            console.log(err);
          })
        )
    }
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
