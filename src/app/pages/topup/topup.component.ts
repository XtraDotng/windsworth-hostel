import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { HttpServicesService } from 'src/app/services/http-services.service';
import { Router } from '@angular/router';
import { WalletContext, CardContext, FundWalletRequest, Card } from 'src/app/models';
import * as moment from 'moment';

@Component({
  selector: 'app-topup',
  templateUrl: './topup.component.html',
  styleUrls: ['./topup.component.css']
})
export class TopupComponent implements OnInit {
  public loading: boolean;
  has_error = false;
  error_msg = '';

  public fullName = localStorage.getItem('fullName');
  public userId = localStorage.getItem('userId');
  userdata: any;

  cards: CardContext[] = [];
  card = "";
  cardTitle = 'Select Card';
  wallets: WalletContext[] = [];
  walletTitle = 'Select Wallet';
  wallet = "";
  amount = 0;

  constructor(private service: HttpServicesService, private router: Router) { }

  ngOnInit() {
    this.GetCustomerCards();
    this.GetCustomerWallets();
  }

  GetCustomerCards(){
    this.cardTitle = 'Fetching Cards';
    this.service.GetCustomerCards(+this.userId).subscribe((result) => {
      console.log(result);
      if(result.cards.length > 0){
        this.cardTitle = 'Select Card';
        this.cards = result.cards;
      } else {
        this.cardTitle = 'No Card Maintained';
      }
    });
  }

  GetCustomerWallets(){
    this.walletTitle = 'Fetching Wallets';
    this.service.GetCustomerWallets(+this.userId).subscribe((result) => {
      console.log(result);
      if(result.wallets.length > 0){
        this.walletTitle = 'Select Wallet';
        this.wallets = result.wallets;
      } else {
        this.walletTitle = 'No Wallet Maintained';
      }
    });
  }

  // ProcessPayment(){
  //   this.loading = true;
  //   console.log(this.wallet);
  //   setTimeout(() => {
  //     this.loading = false;
  //   }, 2000);
  // }

  FundWallet(){
    this.loading = true;
    this.has_error = false;
    this.error_msg = '';
    console.log(this.card);
    if(this.card.length === 0){
      this.loading = false;
      this.has_error = true;
      this.error_msg = "Select a card";
      return false;
    }

    if(this.wallet.length === 0){
      this.loading = false;
      this.has_error = true;
      this.error_msg = "Select a wallet";
      return false;
    }

    if(!this.amount || this.amount < 1){
      this.loading = false;
      this.has_error = true;
      this.error_msg = "Invalid amount";
      return false;
    }

    let card = new Card;
    card.cardId = +this.card;
    
    let request = new FundWalletRequest;
    request.referenceNo = moment().format('x');
    request.useCard = true;
    request.walletNumber = +this.wallet;
    request.card = card;
    console.log(request);
    this.service.FundWallet(request).subscribe((result) => {
      this.loading = false;
      console.log(result);
      this.has_error = true;
      this.error_msg = result.statusMessage;
    })
  }
}