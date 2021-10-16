import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs/operators';
import { AdicionalService } from 'src/app/adicionais/adicional.service';
import { AlertaErrorComponent } from 'src/app/alerta-error/alerta-error.component';
import { AlertaSuccesComponent } from 'src/app/alerta-succes/alerta-succes.component';
import { Categoria } from 'src/app/categorias/categoria.model';
import { categoriaService } from 'src/app/categorias/categoria.service';
import { AdicionalObrigatorio } from 'src/app/novo-produto/additionalObrigatorios.model';
import { Adicional } from 'src/app/novo-produto/adicional.model';
import { Product } from 'src/app/novo-produto/product.model';
import { ProductService } from 'src/app/novo-produto/product.service';

@Component({
  selector: 'app-dialog-editar-produto',
  templateUrl: './dialog-editar-produto.component.html',
  styleUrls: ['./dialog-editar-produto.component.css']
})
export class DialogEditarProdutoComponent implements OnInit {

  adicionais: Adicional[] = [];
  categorias: Categoria[] = [];
  todosAdicionais: Adicional[] = [];
  isDraggingOver: boolean = false;
  imagens: FileList;
  existeIMagem: boolean = false;
  adicionaisObrigatorios: AdicionalObrigatorio[] = [];


  novoProdutoForm: FormGroup = this.formBuilder.group({
    'name': ['', [Validators.required, Validators.minLength(3)]],
    'price': ['', [Validators.required, Validators.min(1)]],
    'description': ['', [Validators.required, Validators.minLength(3)]],
    'category': ['', [Validators.required]],
    'availability': [this.produto.availability, [Validators.required]]
  });

  constructor(public dialogRef: MatDialogRef<DialogEditarProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public produto: Product, private formBuilder: FormBuilder, private productService: ProductService, private _snackBar: MatSnackBar, private categoriaService: categoriaService, private adicionalService: AdicionalService) { }



  ngOnInit(): void {
    this.categoriaService.getCategories()
      .subscribe(data => this.categorias = data);

    this.adicionalService.getAdicionals()
      .subscribe(data => this.todosAdicionais = data);

    console.log(this.produto);

  }

  addAdicional() {
    let itemVazio: boolean = false;
    let adicional: Adicional = new Adicional("", 0, "", 0, 0, 0, 0);
    this.produto.additional?.forEach(item => {
      if (item.name === "") {
        itemVazio = true;
      }
    });
    if (!itemVazio) {
      this.produto.additional?.push(adicional);
    }
    console.log(itemVazio);
  }

  addAdicionalEmObrigatorio(AdicionalObrigatorio: AdicionalObrigatorio) {
    let itemVazio: boolean = false;
    let adicional: Adicional = new Adicional("", 0, "", 0, 0, 0, 0);
    AdicionalObrigatorio.additionals.forEach(item => {
      if (item.name === "") {
        itemVazio = true;
      }
    });
    if (!itemVazio) {
      AdicionalObrigatorio.additionals.push(adicional);
    }
    console.log(itemVazio);
  }






  addAdicionalObrigatorio() {
    let itemVazio: boolean = false;
    let adicionalObrigatorio: AdicionalObrigatorio = new AdicionalObrigatorio("",0,0,[])
    this.produto.additional?.forEach(item => {
      if (item.name === "") {
        itemVazio = true;
      }
    });
    if (!itemVazio) {
      this.adicionaisObrigatorios.push(adicionalObrigatorio);
    }
    console.log(itemVazio);
  }

  removeAdicionalObrigatorio(adicional: AdicionalObrigatorio) {
    this.adicionaisObrigatorios.splice(this.adicionaisObrigatorios.indexOf(adicional), 1);
  }


  





  removeAdicional(adicional: Adicional) {
    this.produto.additional?.splice(this.produto.additional?.indexOf(adicional), 1);
  }

  removeAdicionalEmObrigatorio(adicionalObrigatorio: AdicionalObrigatorio, adicional: Adicional) {
    adicionalObrigatorio.additionals.splice(adicionalObrigatorio.additionals.indexOf(adicional), 1);
  }


  editProduct() {
    let formData = new FormData;
    if (this.imagens){
      formData.append('file', this.imagens[0])
    }
    
    this.productService.putProduct(this.produto, this.produto.id)
      .subscribe(
        (res => {
          if (this.imagens){
            this.postarImagem(formData, this.produto)
          }
          
        }),
        (err => {
          this.openSnackBarError();
          console.log(err);

        })
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

  cadastrarAdicional(adicional: Adicional) {
    let jaExiste: boolean = false;

    this.produto.additional?.forEach(item => {
      if (item.name === adicional.name && item.price === adicional.price && item.description === adicional.description) {
        jaExiste = true;
      }
    })

    if (!jaExiste) {
      this.produto.additional?.forEach(item => {
        if (item.name === "" && item.price === 0) {
          item.name = adicional.name;
          item.id = adicional.id;
          item.price = adicional.price;
          item.description = adicional.description;
        }
      });
    }

  }
  
  cadastrarAdicionalEmObrigatorio(adicionalObrigatorio: AdicionalObrigatorio ,adicional: Adicional) {
    let jaExiste: boolean = false;

    adicionalObrigatorio.additionals.forEach(item => {
      if (item.name === adicional.name && item.price === adicional.price && item.description === adicional.description) {
        jaExiste = true;
      }
    })

    if (!jaExiste) {
      adicionalObrigatorio.additionals.forEach(item => {
        if (item.name === "" && item.price === 0) {
          item.name = adicional.name;
          item.id = adicional.id;
          item.price = adicional.price;
          item.description = adicional.description;
        }
      });
    }

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

  postarImagem(formData: FormData, produto: Product) {
    if (this.imagens[0]) {
      console.log("tentando enviar");

      this.productService.postImage(formData, produto.id)
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



}