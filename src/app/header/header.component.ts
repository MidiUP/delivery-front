import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHamburger, faMobileAlt, faAddressCard, faHome } from '@fortawesome/free-solid-svg-icons';
import { authService } from '../auth/auth.service/auth.service';
import { Empresa } from '../info-empresa/empresa.model';
import { EmpresaService } from '../info-empresa/empresa.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faHamburger = faHamburger;
  faMobileAlt = faMobileAlt;
  faAddressCard = faAddressCard;
  faHome = faHome;


  empresa: Empresa = new Empresa(0, "", "", "", "", "", "", "", "", true, [], "", "")


  user: User = new User("Visitante", "", "", "", "", 0)
  authenticated: boolean;
  admin: boolean;
  whatsapp: string = "";


  constructor(private authService: authService, private userService: UserService, private router: Router, private empresaService: EmpresaService) {
    if (this.authService.isAuthenticated()) {
      this.authenticated = true;
      if (this.authService.isAdmin()) {
        this.admin = true;
      } else {
        this.admin = false;
      }
    } else {
      this.authenticated = false;
    }

    if (this.authService.isAuthenticated()) {
      let username: string = this.authService.getUsername();
      this.userService.findByUsername(username)
        .subscribe(
          (data => {
            this.user = data;
          })
        )

    }

  }

  ngOnInit(): void {
    this.empresaService.getEmpresaById()
      .subscribe(res => {
        this.empresa = res;
        this.whatsapp = `https://api.whatsapp.com/send?phone=55${res.whatsapp}`;

      });




  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }


}
