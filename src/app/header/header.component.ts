import { Component, OnInit } from '@angular/core';
import { faHamburger, faMobileAlt, faAddressCard, faHome} from '@fortawesome/free-solid-svg-icons';

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
  
  constructor() { }

  ngOnInit(): void {
  }

}
