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

  paymentMethod = '';

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
    let referenceNo = this.service.GenerateReference();
    let card = new Card;
    let wallet = new WalletContext;

    if(this.paymentMethod === ''){
      this.loading = false;
      this.has_error = true;
      this.error_msg = "Select a payment method";
      return false;
    }

    if(this.paymentMethod == 'Card' && this.card === ''){
      this.loading = false;
      this.has_error = true;
      this.error_msg = "Select a card";
      return false;
    }

    if(this.paymentMethod == 'Wallet' && this.wallet === ''){
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

    if(this.paymentMethod === 'Card'){
      card.cardId = +this.card;
      let request = new FundWalletRequest;
      request.amount = this.amount;
      request.card = card;
      request.referenceNo = referenceNo
      request.useCard = true;
      request.walletNumber = +this.sessionwallet.vendor_id;

      this.service.FundWallet(request).subscribe((result) => {
        this.loading = false;
        this.has_error = true;
        this.error_msg = result.statusMessage;
        if(result.statusCode === '00'){
          this.sessionwallet.balance += this.amount;
          this.sessionwallet.credit += this.amount;
          this.sessionwallet.credit_transactionid = referenceNo;
          this.service.UpdateWallet(this.sessionwallet).subscribe((data) => {
            this.error_msg = result.statusMessage;
            this.amount = 0;
            this.card = '';
            this.wallet = ''
          })
        }
      })
    }
    
  }
}
