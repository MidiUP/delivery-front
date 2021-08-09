import { Component, OnInit } from '@angular/core';
import { Bairro } from '../novo-bairro/bairro.model';
import { bairroService } from '../novo-bairro/bairro.service';

@Component({
  selector: 'app-bairros',
  templateUrl: './bairros.component.html',
  styleUrls: ['./bairros.component.css']
})
export class BairrosComponent implements OnInit {

  bairros: Bairro[];

  constructor(private bairroService: bairroService) { }

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

}
