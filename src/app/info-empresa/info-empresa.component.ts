import { ThisReceiver } from '@angular/compiler';
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
  empresa = new Empresa(0, "", "", "", "", "", "", "", "");
  isDraggingOver: boolean = false;
  imagens: FileList;
  existeIMagem: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private empresaService: EmpresaService) {
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
      whatsapp: this.formBuilder.control('', [Validators.required,]),
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

    let formData = new FormData;
    if (this.imagens) {
      formData.append('file', this.imagens[0])
    }

    this.empresaService.putEmpresa(this.empresa, 1)
      .subscribe(
        (res) => {
          console.log("Alterado");
          this.postarImagem(formData);
        },
        (err) => {
          console.log(err);
          console.log(this.empresa)
        }
      )
  }

  onDragOverEvent(event: DragEvent) {
    this.isDraggingOver = true;
    event.preventDefault();
  }

  onDragLeaveEvent(event: DragEvent) {
    this.isDraggingOver = false;
    event.preventDefault();
  }

  onDropEvent(event: DragEvent) {
    event.preventDefault();
    this.imagens = event.dataTransfer?.files || new FileList;
    this.existeIMagem = true;
    console.log(this.imagens[0].name);
  }

  postarImagem(formData: FormData, ) {
    if (this.imagens[0]) {
      console.log("tentando enviar");

      this.empresaService.postImage(formData)
        .subscribe(
          (res => {
            console.log("upload concluido");
          }),
          (err => {
            console.log(err);
          })
        )
    }
  }
}
