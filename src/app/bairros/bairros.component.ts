import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Bairro } from '../novo-bairro/bairro.model';
import { bairroService } from '../novo-bairro/bairro.service';
import { DialogDeleteBairroComponent } from './dialog-delete-bairro/dialog-delete-bairro.component';

@Component({
  selector: 'app-bairros',
  templateUrl: './bairros.component.html',
  styleUrls: ['./bairros.component.css']
})
export class BairrosComponent implements OnInit {

  bairros: Bairro[];

  constructor(private bairroService: bairroService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getBairros();
  }

  getBairros(): void {
    this.bairroService.getBairros()
      .subscribe(
        data => {
          this.bairros = data;
        }
      )
  }

  openDialogDelete(id: number){
    const dialogRef = this.dialog.open(DialogDeleteBairroComponent, {
      data: {id: id}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getBairros();
    });
  }

}
