import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Students } from 'src/app/models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userdata: Students;
  avatar = 'assets/img/avatar/avatar-chef-0.png';
  
  constructor(private router: Router, private authService: AuthService) {
    this.userdata = this.authService.getAuthenticatedUser();
    if (this.userdata.photo !== null) {
      this.avatar = this.userdata.photo;
    }
   }

  ngOnInit() {
  }

  LogOut(){
    this.authService.logout();
    this.router.navigate(['/home/login']);
  }

}
