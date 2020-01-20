import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { HttpServicesService } from 'src/app/services/http-services.service';
import { Router } from '@angular/router';
import { CardContext, TransactionContext } from 'src/app/models';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public loading: boolean;
  has_error = false;
  error_msg = '';

  public fullName = localStorage.getItem('fullName');
  public userId = localStorage.getItem('userId');
  userdata: any;
  cards: CardContext[] = [];
  cardResponse = '';
  cardNumber = '';
  cardName = '';
  cardType = '';
  cvv = '';
  cardExpiry = '';

  card_error = false;
  card_error_msg = '';

  transactions: TransactionContext[] = []
  tranResponse = '';

  hostel_balance = 0;
  expense_balance = 0;

  constructor(private service: HttpServicesService, private router: Router) { }

  ngOnInit() {
    this.GetCustomerDetail();
    this.GetCustomerCards();
    this.cardName = this.fullName;
    this.GetCustomerTransactions();
  }

  GetCustomerDetail(){
    this.service.GetCustomerDetail(+this.userId).subscribe((result) => {
      if(result.statusCode === '00'){
        this.userdata = result.details;
      }
    });
  }

  GetCustomerCards(){
    this.cardResponse = 'Fetching cards...';
    this.service.GetCustomerCards(+this.userId).subscribe((result) => {
      // console.log(result);
      if(result.statusCode === '00'){
        this.cards = result.cards;
      } else {
        this.cardResponse = result.statusMessage;
      }
    }, error => {
      this.cardResponse = error.statusText;
    });
  }

  AddCard(){
    this.loading = true;
    this.card_error = false;
    this.card_error_msg = '';
    if(this.cardNumber.length < 1 && this.cardName.length < 1){
      this.has_error = true;
      this.loading = false;
      this.error_msg = "Fill in card name and card number";
      return false;
    }
    let request = new CardContext;
    request.cardNumber = +this.cardNumber;
    request.cardName = this.cardName;
    request.cardType = this.cardNumber.substring(0, 1) == '4' ? 'Visa' : 'Mastercard';
    request.customerId = +this.userId;
    this.service.AddCard(request).subscribe((result) => {
      this.loading = false;
      // console.log(result);
      this.card_error = true;
      this.card_error_msg = result.statusMessage;
      if(result.statusCode === '00'){
        this.cardNumber = '';
        this.cardName = '';
      } else {
        return false;
      }
    }, error => {
      this.loading = false;
      this.card_error = true;
      this.card_error_msg = error.statusText;
    });
  }

  GetCustomerTransactions(){
    this.tranResponse = 'Fetching cards...';
    this.service.GetCustomerTransactions(+this.userId).subscribe((result) => {
      // console.log(result);
      if(result.statusCode === '00'){
        this.transactions = result.transactions;
      } else {
        this.tranResponse = result.statusMessage;
      }
    }, error => {
      this.tranResponse = error.statusText;
    });
  }

  AddTicket(){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
    
  }
}
