import { Component, OnInit } from '@angular/core';
import { faHamburger, faMobileAlt, faAddressCard, faHome} from '@fortawesome/free-solid-svg-icons';
import { authService } from '../auth/auth.service/auth.service';
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

  user: User = new User("Visitante","","","","","","",undefined)
  
  
  constructor(private authService: authService,
              private userService: UserService) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      console.log("autenticado");
      let username: string = this.authService.getUsername();
      console.log(username);

      this.userService.findByUsername(username)
        .subscribe(
          (data => {
            this.user = data;
          })
        )

    }
  }


}
