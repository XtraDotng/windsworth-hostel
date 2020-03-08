import { Component, OnInit } from '@angular/core';
import { HttpServicesService } from 'src/app/services/http-services.service';
import { RegisterRequest, WalletContext, LoginRequest, AddWalletRequst, Students } from 'src/app/models';

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
  password = '';
  password2 = '';
  userdata: Students;

  constructor(private service: HttpServicesService) { }

  ngOnInit() {
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

    let request = new RegisterRequest;
    request.firstName = this.firstName;
    request.lastName = this.lastName;
    request.email = this.email;
    request.phone = this.phone;
    request.password = this.password;
    request.country = 'Nigeria';
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
        this.AddWallet("Hostel Wallet");
        this.AddWallet("Expense Wallet");
      }
    }, error => {
      this.loading = false;
      this.has_error = true;
      this.error_msg = error.statusText;
      console.log(error);
    })
  }

  AddWallet(walletType: string){
    let request = new AddWalletRequst;
    request.customerId = +this.userdata.customerId;
    request.description = walletType;
    request.walletType = walletType;
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
