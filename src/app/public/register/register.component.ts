import { Component, OnInit } from '@angular/core';
import { HttpServicesService } from 'src/app/services/http-services.service';
import { RegisterRequest, WalletContext, LoginRequest, AddWalletRequst, Students, Locations } from 'src/app/models';
declare const $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public loading: boolean;
  has_error = false;
  error_msg = '';

  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  address = '';
  password = '';
  password2 = '';
  location = '';
  course = '';
  dob: Date;
  userdata: Students;
  locations: Locations[] = [];

  constructor(private service: HttpServicesService) { }

  ngOnInit() {
    this.GetLocations();
    $('#dob').datepicker({
      autoclose: true
    });
  }

  GetLocations(){
    this.service.GetLocations().subscribe((result) => {
      this.locations = result;
    })
  }

  Register(){
    this.loading = true;
    this.has_error = false;
    this.error_msg = '';

    if(this.password !== this.password2){
      this.loading = false;
      this.has_error = true;
      this.error_msg = 'Password does not match';
      return false;
    }

    let request = new Students;
    request.first_name = this.firstName;
    request.last_name = this.lastName;
    request.email = this.email;
    request.phone = this.phone;
    request.password = this.password;
    request.emailverify = "NO";
    request.registration_completed = "NO";
    request.access = "DENIED";
    console.log(request);
    this.service.Register(request).subscribe((result) => {
      this.loading = false;
      console.log(result);
      this.has_error = true;
      this.error_msg = result.statusMessage;
      if(result.statusCode !== "00"){
        return false;
      } else {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phone = '';
        this.password2 = '';
        this.password = '';
        this.GetDetails();
        this.AddWallet("1");
        this.AddWallet("0");
      }
    }, error => {
      this.loading = false;
      this.has_error = true;
      this.error_msg = error.statusText;
      console.log(error);
    })
  }

  AddWallet(walletType: string){
    let request = new WalletContext;
    request.student_id = this.userdata.student_id;
    request.wallet_code = walletType === "0" ? 'DEFAULT-WALLET' : 'ACCOMMODATION';
    request.description = walletType;
    request.debit_ordernumber = "0";
    request.credit = 0;
    request.debit = 0;
    request.balance = 0;
    this.service.AddWallet(request).subscribe((result) => {
      this.has_error = true;
      this.error_msg = result.statusMessage
      return false;
    })
  }

  GetDetails(){
    let request = new LoginRequest;
    request.email = this.email;
    request.password = this.password;
    this.service.Login(request).subscribe((result) => {
      if(result.statusCode === "00"){
        this.userdata = result.data;
      }
    }, error => {
      this.userdata = null;
    });
  }

}
