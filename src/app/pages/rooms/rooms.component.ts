import { Component, OnInit } from '@angular/core';
import { HttpServicesService } from 'src/app/services/http-services.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { WalletContext, Payments, PaymentDetails, TransferRequest } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  public loading: boolean;
  has_error = false;
  error_msg = '';
  isbook = false;

  walletTitle = ''
  wallets: WalletContext[] = [];
  userdata;
  title = '';
  wallet_code = '';
  room:any;
  amount = 0;
  requestType: RequestType;

  rooms = [
    {
      room_type: "Platinum",
      price: 400000,
      security_deposit: 5000,
      service_charge: 10000,
      duration: 1,
      duration_type: "Day(s)",
      image: "assets/img/courses/img1.png"
    },
    {
      room_type: "Gold",
      price: 220000,
      security_deposit: 5000,
      service_charge: 10000,
      duration: 12,
      duration_type: "Months(s)",
      image: "assets/img/courses/img2.png"
    },
    {
      room_type: "Silver",
      price: 90000,
      security_deposit: 5000,
      service_charge: 10000,
      duration: 12,
      duration_type: "Months(s)",
      image: "assets/img/courses/img3.png"
    },
    {
      room_type: "Short Stay",
      price: 2500,
      security_deposit: 5000,
      service_charge: 10000,
      duration: 12,
      duration_type: "Months(s)",
      image: "assets/img/courses/img4.png"
    }
  ]

  constructor(private service: HttpServicesService, private router: Router, private authService: AuthService) {
    this.userdata = this.authService.getAuthenticatedUser();
   }

  ngOnInit() {
    this.GetCustomerWallets()
  }

  GetCustomerWallets(){
    this.walletTitle = 'Fetching Wallets';
    this.service.GetCustomerWallets(this.userdata.student_id).subscribe((result) => {
      if(result.length > 0){
        this.walletTitle = 'Select Wallet';
        this.wallets = result;
      } else {
        this.walletTitle = 'No Wallet Maintained';
      }
    });
  }


  Book(roomType){
    this.isbook = true;
    this.title = 'Booking for a ' + roomType.room_type + ' room';
    this.room = roomType;
    this.amount = roomType.price + roomType.security_deposit + roomType.service_charge;
    this.requestType = RequestType.Book;
    this.wallet_code = '';
  }

  Reserve(roomType){
    this.isbook = true;
    this.title = 'Reservation for a ' + roomType.room_type + ' room';
    this.room = roomType;
    this.amount = roomType.security_deposit;
    this.requestType = RequestType.Reservation;
    this.wallet_code = '';
  }

  ProcessReservation(){
    this.has_error = false;
    this.error_msg = '';
    let referenceNo = this.service.GenerateReference();
    let wallet = this.wallets.find(x => x.wallet_code === this.wallet_code);
    if(this.wallet_code === '' || this.wallet_code === undefined){
      this.has_error = true;
      this.error_msg = 'Kindly select a wallet';
      return false;
    }
    if(this.amount < 1){
      this.has_error = true;
      this.error_msg = 'Kindly select a room';
      return false;
    }
    if(this.amount > wallet.balance){
      this.has_error = true;
      this.error_msg = 'Insufficient funds';
      return false;
    }

    this.DebitWallet(wallet, this.amount, referenceNo, this.room);
  }

  cancelBooking(){
    this.isbook = false;
    this.has_error = false;
    this.error_msg = '';
  }

  DebitWallet(wallet: WalletContext, amount: number, referenceNo: string, room){
    wallet.balance -= amount;
    wallet.debit += amount;
    wallet.debit_ordernumber = referenceNo;
    let request = new TransferRequest;
    request.conversionRate = 1;
    request.customerId = this.userdata.customerId;
    request.destinationAccountName = environment.wondoSettings.customerName;
    request.destinationAccountNumber = environment.wondoSettings.walletNumber;
    request.destinationAccountType = environment.wondoSettings.accountType;
    request.destinationBankCode = null;
    request.destinationCurrencyId = environment.wondoSettings.currencyCode;
    request.referenceNumber = referenceNo;
    request.sourceAccountNumber = wallet.vendor_id;
    request.sourceAccountType = environment.wondoSettings.accountType;
    request.transactionAmount = amount;
    request.transactionFee = 0;
    this.service.InstantTransfer(request).subscribe((data) => {
      if(data.statusCode !== '00'){
        this.has_error = true;
        this.error_msg = data.statusMessage;
        return false;
      }
    });

    this.service.UpdateWallet(wallet).subscribe((data) => {
      if(data.statusCode == '00'){
        let payment = new Payments;
        payment.student_id = this.userdata.student_id;
        payment.payment_id = referenceNo;
        payment.student_name = this.userdata.full_name;
        payment.total = amount;
        payment.payment_date = new Date();
        payment.payment_status = 'COMPLETED';
        payment.payment_reference = this.service.GenerateReference();
        payment.transaction_type = 'FRESH REGISTRATION';
        payment.current_session = '2019';
        payment.created = new Date();
        payment.coupon_code = null;
        payment.coupon_type = null;
        payment.coupon_amount = 0;
        payment.payment_method = 'ONLINE';
        this.service.AddPayment(payment).subscribe((data) => {
          if(data.statusCode == '00'){
            let paymentdetails = new PaymentDetails;
            paymentdetails.payment_id = referenceNo;
            paymentdetails.student_id = this.userdata.student_id;
            paymentdetails.student_name = this.userdata.full_name;
            paymentdetails.item = 'ACCOMMODATION';
            paymentdetails.room_type = room.room_type;
            paymentdetails.duration = 12;
            paymentdetails.payment_status = 'CONFIRMED';
            paymentdetails.amount = this.requestType === RequestType.Book ? amount : 0;
            paymentdetails.credit =  this.requestType === RequestType.Book ? 0: amount;
            paymentdetails.trans_type = this.requestType === RequestType.Book ? 'DEBIT' : 'CREDIT';
            paymentdetails.description = this.requestType === RequestType.Book ? 'ACCOMMODATION BOOKING' : 'ACCOMMODATION RESERVATION';
            paymentdetails.session = new Date().getFullYear().toString();
            paymentdetails.transaction_type = 'FRESH REGISTRATION';
            paymentdetails.created = new Date();
            paymentdetails.service_charge = this.requestType === RequestType.Book ? room.service_charge : 0;
            paymentdetails.security_deposit = this.requestType === RequestType.Book ? room.security_deposit : 0;
            this.service.AddPaymentDetails(paymentdetails).subscribe((data) => {
              this.has_error = true;
              
              if(data.statusCode == '00'){
                this.wallet_code = '';
                this.amount = 0;
                this.error_msg = 'Successful';
              }
              else {
                this.error_msg = data.statusMessage;
              }
            })
          } else {
            this.has_error = true;
            this.error_msg = data.statusMessage;
          }
        })
      } else {
        this.has_error = true;
        this.error_msg = data.statusMessage;
      }
    })
  }

  GetPayment(payment_id){
    this.service.GetPaymentById(payment_id).subscribe((data) => {
      return data;
    })
  }
  
}

export enum RequestType {
    Book,
    Reservation
}
