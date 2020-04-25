import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { HttpServicesService } from 'src/app/services/http-services.service';
import { Router } from '@angular/router';
import { WalletContext, CardContext, FundWalletRequest, Card } from 'src/app/models';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-topup',
  templateUrl: './topup.component.html',
  styleUrls: ['./topup.component.css']
})
export class TopupComponent implements OnInit {
  public loading: boolean;
  has_error = false;
  error_msg = '';

  // public fullName = localStorage.getItem('fullName');
  // public userId = localStorage.getItem('userId');
  // public student_id = localStorage.getItem('student_id');
  userdata: any;

  cards: CardContext[] = [];
  card = "";
  cardTitle = 'Select Card';
  wallets: WalletContext[] = [];
  walletTitle = 'Select Wallet';
  wallet = "";
  amount = 0;
  sessionwallet: WalletContext;

  constructor(private service: HttpServicesService, private router: Router, private authService: AuthService) {
    this.userdata = this.authService.getAuthenticatedUser();
    this.sessionwallet = this.getWalletSession();
   }

  ngOnInit() {
    this.GetCustomerCards();
    this.GetCustomerWallets();
  }

  GetCustomerCards(){
    this.cardTitle = 'Fetching Cards';
    this.service.GetCustomerCards(+this.userdata.customerid).subscribe((result) => {
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
    this.service.GetCustomerWallets(this.userdata.student_id).subscribe((result) => {
      if(result.length > 0){
        this.walletTitle = 'Select Wallet';
        this.wallets = result.filter(x => x.id !== this.sessionwallet.id);
      } else {
        this.walletTitle = 'No Wallet Maintained';
      }
    });
  }

  getWalletSession = () => {
    if (!sessionStorage.getItem('wallet')) {
      return null;
    }
    return JSON.parse(sessionStorage.getItem('wallet'));
  }

  FundWallet(){
    this.loading = true;
    this.has_error = false;
    this.error_msg = '';
    console.log(this.card);
    if(this.card.length === 0 && this.wallet.length === 0){
      this.loading = false;
      this.has_error = true;
      this.error_msg = "Select a card or wallet";
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
    request.useCard = true;
    request.walletNumber = +this.wallet;
    request.card = card;
    request.amount = this.amount;
    console.log(request);
    this.service.FundWallet(request).subscribe((result) => {
      this.loading = false;
      console.log(result);
      this.has_error = true;
      this.error_msg = result.statusMessage;
    })
  }
}
