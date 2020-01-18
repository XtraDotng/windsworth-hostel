import { Component, OnInit } from '@angular/core';
import { HttpServicesService } from 'src/app/services/http-services.service';
import { LoginRequest } from 'src/app/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public loading: boolean;
  has_error = false;
  error_msg = '';

  email = '';
  password = '';  

  constructor(private service: HttpServicesService, private router: Router) { }

  ngOnInit() {
  }

  Login(){
    this.loading = true;
    this.has_error = false;
    this.error_msg = '';
    let request = new LoginRequest;
    request.email = this.email;
    request.password = this.password;
    this.service.Login(request).subscribe((result) => {
      this.loading = false;
      if(result.statusCode !== "00"){
        this.has_error = true;
        this.error_msg = result.statusMessage;
      } else {
        if(result.details === null){
          this.has_error = true;
          this.error_msg = "Error fetching user details. Please try again!";
          return false;
        }
        this.has_error = false;
        this.error_msg = '';
        let userdata = result.details;
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('userId', userdata.customerId.toString());
        localStorage.setItem('fullName', userdata.firstName + ' ' + userdata.lastName);
        this.router.navigate(['/account']);
      }
    }, error => {
      this.loading = false;
      this.has_error = true;
      this.error_msg = error.statusText;
    });
  }

}
