import { Component, OnInit } from '@angular/core';
import { Empresa } from '../info-empresa/empresa.model';
import { EmpresaService } from '../info-empresa/empresa.service';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent implements OnInit {

  empresa: Empresa = new Empresa(0, "", "","", "", "", "", "", "", true, [], "", "");

  constructor(private empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.getEmpresa();
  }

  getEmpresa(){
    this.empresaService.getEmpresaById()
      .subscribe(data => this.empresa = data)
  }

  retornoBackground(): string{
    if (this.empresa.backgroundPath == ""){
      return "overflow: hidden; background: white; background-size: cover; overflow: hidden; height: 100vh;"
    }else {
      return "overflow: hidden; background: url("+this.empresa.backgroundPath+") no-repeat fixed; background-size: cover; overflow: hidden; height: 100vh;"
    }
  }

}
