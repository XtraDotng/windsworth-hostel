import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { HttpServicesService } from 'src/app/services/http-services.service';
import { Router } from '@angular/router';
import { CardContext, TransactionContext, WalletContext, Students, Payments, AddCardRequest } from 'src/app/models';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { AuthService } from 'src/app/services/auth.service';
declare const $: any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public loading: boolean;
  has_error = false;
  error_msg = '';
  avatar = 'assets/img/avatar/avatar-chef-0.png';

  userdata: Students;
  cards: CardContext[] = [];
  cardResponse = '';
  cardNumber = '';
  cardName = '';
  cardType = '';
  cvv = '';
  cardExpiry = '';

  card_error = false;
  card_error_msg = '';

  payments: Payments[] = [];
  paymentResponse = '';

  hostel_balance = 0;
  expense_balance = 0;

  hostel_wallet: WalletContext;
  expense_wallet: WalletContext;
  wallets: WalletContext[] = [];

  constructor(private service: HttpServicesService, private router: Router, private authService: AuthService, private ref: ChangeDetectorRef) {
    this.userdata = this.authService.getAuthenticatedUser();
    if (this.userdata.photo !== null) {
      this.avatar = this.userdata.photo;
    }
   }

  ngOnInit() {
    this.GetCustomerCards();
    this.cardName = this.userdata.full_name;
    this.GetPaymentsByStudentId();
    this.GetCustomerWallets();
  }

  GetCustomerCards() {
    this.cardResponse = 'Retrieving your maintained cards...';
    this.service.GetCustomerCards(+this.userdata.customerid).subscribe((result) => {
      if (result.statusCode === '00') {
        this.cards = result.cards;
      } else {
        this.cardResponse = result.statusMessage;
      }
    }, error => {
      this.cardResponse = error.statusText;
    });
  }

  AddCard() {
    this.loading = true;
    this.card_error = false;
    this.card_error_msg = '';
    if (this.cardNumber.length < 1 && this.cardName.length < 1) {
      this.has_error = true;
      this.loading = false;
      this.error_msg = "Fill in card name and card number";
      return false;
    }
    let request = new AddCardRequest;
    request.cardNumber = this.cardNumber;
    request.cardName = this.cardName;
    // request.cardType = this.cardNumber.substring(0, 1) === '4' ? 'Visa' : 'Mastercard';
    request.customerId = +this.userdata.customerid;
    request.expiryDate = this.cardExpiry;
    request.cvv = this.cvv;
    this.service.AddCard(request).subscribe((result) => {
      this.loading = false;
      // console.log(result);
      this.card_error = true;
      this.card_error_msg = result.statusMessage;
      this.GetCustomerCards();
      if (result.statusCode === '00') {
        this.cardNumber = '';
        this.cardExpiry = '';
        this.cvv = '';
      } else {
        return false;
      }
    }, error => {
      this.loading = false;
      this.card_error = true;
      this.card_error_msg = error.statusText;
    });
  }

  deleteCard(card) {

  }

  GetPaymentsByStudentId() {
    this.paymentResponse = 'Fetching your payments';
    this.service.GetPaymentsByStudentId(this.userdata.student_id).subscribe((result) => {
      this.payments = result;
      this.paymentResponse = result.length > 0 ? '' : 'No data';

      this.ref.detectChanges();

      // $('#payment-tab').DataTable({
      //   "pagingType": "full_numbers",
      //   "lengthMenu": [
      //     [10, 25, 50, -1],
      //     [10, 25, 50, "All"]
      //   ],
      //   responsive: true,
      //   language: {
      //     search: "_INPUT_",
      //     searchPlaceholder: "Search records",
      //   }
      // });

      // const table = $('#payment-tab').DataTable();
    });
  }

  AddTicket() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);

  }

  GetCustomerWallets() {
    this.service.GetCustomerWallets(this.userdata.student_id).subscribe((result) => {
      // console.log(result);
      if (result.length > 0) {
        this.wallets = result;
        this.hostel_wallet = result.filter(x => x.wallet_code === 'ACCOMMODATION')[0];
        this.expense_wallet = result.filter(x => x.wallet_code === 'DEFAULT-WALLET')[0];
        this.hostel_balance = this.hostel_wallet.balance;
        this.expense_balance = this.expense_wallet.balance;
      }
    });
  }

  setWallet(walletid: number){
    let wallet = walletid == 1 ? this.hostel_wallet : this.expense_wallet;
    sessionStorage.setItem('wallet', JSON.stringify(wallet));
  }

  removeWallet(wallet: any){
    sessionStorage.removeItem('wallet');
  }
}
