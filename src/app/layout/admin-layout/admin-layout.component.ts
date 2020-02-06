import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  public fullName = localStorage.getItem('fullName');
  public userId = localStorage.getItem('userId');
  constructor(private router: Router) { }

  ngOnInit() {
    if(this.userId === null){
      this.router.navigate(['/home/login']);
    }
  }

}
