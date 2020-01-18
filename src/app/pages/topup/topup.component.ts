import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { HttpServicesService } from 'src/app/services/http-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topup',
  templateUrl: './topup.component.html',
  styleUrls: ['./topup.component.css']
})
export class TopupComponent implements OnInit {

  public fullName = localStorage.getItem('fullName');
  public userId = localStorage.getItem('userId');
  userdata: any;

  constructor(private service: HttpServicesService, private router: Router) { }

  ngOnInit() {
    this.GetCustomerCards();
  }

  GetCustomerCards(){
    this.service.GetCustomerCards(+this.userId).subscribe((result) => {
      console.log(result);
    });
  }

}
