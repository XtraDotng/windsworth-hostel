import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public fullName = localStorage.getItem('fullName');
  public userId = localStorage.getItem('userId');
  public isLoggedin = localStorage.getItem('isLoggedin');
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  LogOut(){
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('userId');
    localStorage.removeItem('fullName');
    this.router.navigate(['/home/login']);
  }

}
