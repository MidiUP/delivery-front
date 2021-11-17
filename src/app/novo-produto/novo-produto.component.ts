import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdicionalService } from '../adicionais/adicional.service';
import { AlertaErrorComponent } from '../alerta-error/alerta-error.component';
import { AlertaSuccesComponent } from '../alerta-succes/alerta-succes.component';
import { Categoria } from '../categorias/categoria.model';
import { categoriaService } from '../categorias/categoria.service';

import { additionalRequired, Adicional } from './adicional.model';
import { Product } from './product.model';
import { ProductService } from './product.service';


@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.css']
})
export class NovoProdutoComponent implements OnInit {

  categorias: Categoria[];
  newProductForm: FormGroup;
  additionalRequired: FormGroup;
  product: Product = new Product("", 0, "", true, 50, 5, 0, 0, 0, { id: 0, description: "" }, "", [], "", [], [], []);
  todosAdicionais: Adicional[] = [];
  adicionaisObrigatorios: additionalRequired[] = [];
  isDraggingOver: boolean = false;
  imagens: FileList;
  existeIMagem: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    private categoriaService: categoriaService,
    private adicionalService: AdicionalService) { }

  ngOnInit(): void {

    this.getCategorias();

    this.newProductForm = new FormGroup({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      description: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
      category: this.formBuilder.control('',),
      quantity: this.formBuilder.control('', []),
      price: this.formBuilder.control('', [Validators.required, Validators.min(1)]),
      availability: this.formBuilder.control('', [])
    }, { updateOn: 'change' });

    this.additionalRequired = new FormGroup({
      name: this.formBuilder.control([Validators.required]),
      quantityMin: this.formBuilder.control([Validators.required]),
      quantityMax: this.formBuilder.control([Validators.required]),

    }, { updateOn: 'change' });

    this.adicionalService.getAdicionals()
      .subscribe(data => this.todosAdicionais = data);
  }

  createProduct(): void {

    let formData = new FormData;
    if (this.imagens) {
      formData.append('file', this.imagens[0])
    }

    let categoria: Categoria = new Categoria(this.product.category.description, this.product.category.id);
    this.product.category = categoria;
    this.productService.createProduct(this.product)
      .subscribe(
        (res) => {
          this.openSnackBarSuccess();
          this.postarImagem(formData, res);
        },
        (err) => {
          this.openSnackBarError();
        }
      );
    // console.log(this.product)

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

  getCategorias(): void {
    this.categoriaService.getCategories()
      .subscribe(
        data => {
          this.categorias = data;
        }
      );
  }

  addAdicional() {
    let itemVazio: boolean = false;
    let adicional: Adicional = new Adicional("", 0, "", 0, 0, 0, 0);
    this.product.additional?.forEach(item => {
      if (item.name === "") {
        itemVazio = true;
      }
    });
    if (!itemVazio) {
      this.product.additional?.push(adicional);
    }

  }

  cadastrarAdicional(adicionalItem: Adicional, adicional: Adicional) {
    // let jaExiste: boolean = false;

    // this.product.additional?.forEach(item => {
    //   if (item.name === adicional.name && item.price === adicional.price && item.description === adicional.description) {
    //     jaExiste = true;
    //   }
    // })

    // if (!jaExiste) {
    adicional.name = adicionalItem.name;
    adicional.description = adicionalItem.description;
    adicional.id = adicionalItem.id;
    adicional.price = adicionalItem.price;

    // this.product.additional?.forEach(item => {
    //   if (item.id === adicional.id) {
    //     item.name = adicional.name;
    //     item.id = adicional.id;
    //     item.price = adicional.price;
    //     item.description = adicional.description;
    //   }
    // });
    // }

  }

  removeAdicional(adicional: Adicional) {
    this.product.additional?.splice(this.product.additional?.indexOf(adicional), 1);
  }

  addAdicionalObrigatorio() {
    let adicionalObrigatorio: additionalRequired = new additionalRequired("", 0, 0, [], 0);
    this.product.additionalRequired?.push(adicionalObrigatorio);

  }

  removeAdicionalObrigatorio(adicional: additionalRequired) {
    // this.product.additionalRequired.splice(this.product.additionalRequired.indexOf(adicional), 1);
    this.product.additionalRequired?.splice(this.product.additionalRequired.indexOf(adicional), 1)
  }

  addAdicionalEmObrigatorio(AdicionalObrigatorio: additionalRequired) {
    let itemVazio: boolean = false;
    let adicional: Adicional = new Adicional("", 0, "", 0, 0, 0, 0);
    AdicionalObrigatorio.additional.forEach(item => {
      if (item.name === "") {
        itemVazio = true;
      }
    });
    if (!itemVazio) {
      AdicionalObrigatorio.additional.push(adicional);
    }
    console.log(itemVazio);
  }

  cadastrarAdicionalEmObrigatorio(adicionalObrigatorio: additionalRequired, adicionalItem: Adicional, adicional: Adicional) {

    adicional.name = adicionalItem.name;
    adicional.description = adicionalItem.description;
    adicional.id = adicionalItem.id;
    adicional.price = adicionalItem.price;
    // let jaExiste: boolean = false;

    // adicionalObrigatorio.additional.forEach(item => {
    //   if (item.name === adicional.name && item.price === adicional.price && item.description === adicional.description) {
    //     jaExiste = true;
    //   }
    // })

    // if (!jaExiste) {
    //   adicionalObrigatorio.additional.forEach(item => {
    //     if (item.name === "" && item.price === 0) {
    //       item.name = adicional.name;
    //       item.id = adicional.id;
    //       item.price = adicional.price;
    //       item.description = adicional.description;
    //     }
    //   });
    // }

  }

  removeAdicionalEmObrigatorio(adicionalObrigatorio: additionalRequired, adicional: Adicional) {
    adicionalObrigatorio.additional.splice(adicionalObrigatorio.additional.indexOf(adicional), 1);
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
  }

  postarImagem(formData: FormData, produto: Product) {
    if (this.imagens) {
      this.productService.postImage(formData, produto.id)
        .subscribe(
          (res => {
            this.openSnackBarSuccess();
            window.location.href = "/admin?newProduct";
          }),
          (err => {
            console.log(err);
            window.location.href = "/admin?newProduct";
          })
        )
    } else {
      window.location.href = "/admin?newProduct";
    }
  }




}


