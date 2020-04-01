import { Component, OnInit } from '@angular/core';
import { HttpServicesService } from 'src/app/services/http-services.service';
import { RegisterRequest, WalletContext, LoginRequest, AddWalletRequst, Students, Locations, Response } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
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
  gender = '';
  level = '';
  matric_no = 'NA';
  userdata: Students;
  locations: Locations[] = [];
  levels: string[] = [
    "100L", "200L", "300L", "400L", "500L", "OTHER"
  ];

  constructor(private service: HttpServicesService, private authService: AuthService) { }

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
    request.address = this.address;
    request.course = this.course;
    request.dob = this.dob;
    request.gender = this.gender;
    request.location = this.location;
    request.matric_number = this.matric_no;
    request.level = this.level;

    this.authService.registerUser(request).subscribe((result) => {
      this.loading = false;
      this.has_error = true;
      this.error_msg = result.statusMessage;
      if(result.statusCode !== "00"){
        return false;
      } else {
        this.CreateWallet();
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phone = '';
        this.password2 = '';
        this.password = '';
        this.address = '';
        this.course = '';
        this.gender = '';
        this.location = '';
        this.matric_no = '';
        this.level = '';
      }
    }, error => {
      this.loading = false;
      this.has_error = true;
      this.error_msg = error.statusText;
      console.log(error);
    })
  }

  AddWallet(userdata: Students, walletType: string){
    let request = new WalletContext;
    request.student_id = userdata.student_id;
    request.wallet_code = walletType === "0" ? 'DEFAULT-WALLET' : 'ACCOMMODATION';
    request.description = walletType;
    request.debit_ordernumber = "0";
    request.credit = 0;
    request.debit = 0;
    request.balance = 0;
    request.channel = "ETOPUP";
    this.service.AddWallet(request).subscribe((result) => {
      this.has_error = true;
      this.error_msg = result.statusMessage
      return false;
    })
  }

  CreateWallet(){
    let request = new LoginRequest;
    request.email = this.email;
    request.password = this.password;
    this.authService.loginUser(request).subscribe((result) => {
      if(result.statusCode === "00"){
        this.AddWallet(result.data, "1");
        this.AddWallet(result.data, "0");
      }
    }, error => {
      this.userdata = null;
    });
  }

}
