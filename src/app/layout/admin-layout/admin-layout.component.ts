import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Students } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  userdata: Students;
  constructor(private router: Router, private authService: AuthService) {
    this.userdata = this.authService.getAuthenticatedUser();
   }

  ngOnInit() {
    if(this.userdata === null){
      this.router.navigate(['/home/login']);
    }
  }

}
