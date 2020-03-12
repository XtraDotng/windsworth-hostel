import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { HttpServicesService } from 'src/app/services/http-services.service';
import { Router } from '@angular/router';
import { CardContext, TransactionContext, WalletContext, Students, Payments } from 'src/app/models';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
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

  public fullName = localStorage.getItem('fullName');
  public userId = localStorage.getItem('userId');
  public student_id = localStorage.getItem('student_id');
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
  wallets: WalletContext[] = [];

  constructor(private ref: ChangeDetectorRef, private service: HttpServicesService, private router: Router) { }

  ngOnInit() {
    this.GetCustomerDetail();
    this.GetCustomerCards();
    this.cardName = this.fullName;
    this.GetPaymentsByStudentId();
    this.GetCustomerWallets();
  }

  GetCustomerDetail() {
    this.service.GetStudentDetailById(+this.userId).subscribe((result) => {
      if (result !== null) {
        this.userdata = result;
        if (result.photo !== null) {
          this.avatar = result.photo;
        }
      }
    });
  }

  GetCustomerCards() {
    this.cardResponse = 'Retrieving your maintained cards...';
    this.service.GetCustomerCards(+this.userId).subscribe((result) => {
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
    let request = new CardContext;
    request.cardNumber = +this.cardNumber;
    request.cardName = this.cardName;
    request.cardType = this.cardNumber.substring(0, 1) === '4' ? 'Visa' : 'Mastercard';
    request.customerId = +this.userId;
    this.service.AddCard(request).subscribe((result) => {
      this.loading = false;
      // console.log(result);
      this.card_error = true;
      this.card_error_msg = result.statusMessage;
      this.GetCustomerCards();
      if (result.statusCode === '00') {
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

  deleteCard(card) {

  }

  GetPaymentsByStudentId() {
    this.paymentResponse = 'Fetching your payments';
    this.service.GetPaymentsByStudentId(this.student_id).subscribe((result) => {
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
    this.service.GetCustomerWallets(this.student_id).subscribe((result) => {
      // console.log(result);
      if (result.length > 0) {
        this.wallets = result;
        let hostel = result.filter(x => x.wallet_code === 'ACCOMMODATION')[0];
        let expense = result.filter(x => x.wallet_code === 'DEFAULT-WALLET')[0];
        this.hostel_balance = hostel.balance;
        this.expense_balance = expense.balance;
      }
    });
  }
}
