import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navbarOpen = false;
  
  constructor(public authService:AuthService) { }
  
  toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
  }
  ngOnInit(): void {
  }

}
