import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from './categoria.model';
import { categoriaService } from './categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[];
  categoriaEdit: Categoria = new Categoria("",0);
  categoriaNew: Categoria = new Categoria("",0);
  newCategoriaForm: FormGroup;
  categoriaArray: Categoria;
  editCategoriaForm: FormGroup;




  constructor(private categoriaService: categoriaService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.getCategorias();

    this.newCategoriaForm = new FormGroup({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(2)])
    }, {updateOn: 'change'});

    this.editCategoriaForm = new FormGroup({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(2)])
    }, {updateOn: 'change'});

  }

  createCategory(){
    this.categoriaService.createCategory(this.categoriaNew)
      .subscribe(
        (res) => {
          console.log("Salvo");

        },
        (err) => {
          console.log(err);
        }
      )
  }

  getCategorias(): void {
    this.categoriaService.getCategories()
      .subscribe(
        data => {
          this.categorias = data;
        }
      );
  }

  editCategory(){
    this.categoriaService.putCategory(this.categoriaEdit, this.categoriaEdit.id)
      .subscribe(
        (res) => {
          console.log("editou");
        },
        (err) => {
          console.log(err);
        }
      )
  }

  delete(id: number){

    this.categoriaService.deleteCategory(id)
      .subscribe(
        (res) => {
          console.log("apagou");
        },
        (err) => {
          console.log(err);
        }

      )

  }

  buttonEdit(categoria: Categoria){
    this.categoriaEdit = categoria;
    console.log(this.categoriaEdit);
  }

}
