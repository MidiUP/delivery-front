import { Component, OnInit } from '@angular/core';
import { faHeart} from '@fortawesome/free-solid-svg-icons';
import { Empresa } from '../info-empresa/empresa.model';
import { EmpresaService } from '../info-empresa/empresa.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  faHeart = faHeart;
  empresa: Empresa = new Empresa(0,"","","","","","","","",true, [], "", "")

  constructor(private empresaService:EmpresaService) { }

  ngOnInit(): void {
    this.empresaService.getEmpresaById()
      .subscribe( data => this.empresa = data);
  }

}
