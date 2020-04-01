import { Component, OnInit } from '@angular/core';
import { LoginRequest } from 'src/app/models';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private service: AuthService, private router: Router) { }

  ngOnInit() {
  }

  Login(){
    this.loading = true;
    this.has_error = false;
    this.error_msg = '';
    let request = new LoginRequest;
    request.email = this.email;
    request.password = this.password;
    this.service.loginUser(request).subscribe((result) => {
      this.loading = false;
      if(result.statusCode !== "00"){
        this.has_error = true;
        this.error_msg = result.statusMessage;
      } else {
        if(result.data === null){
          this.has_error = true;
          this.error_msg = "Error fetching user details. Please try again!";
          return false;
        }
        this.has_error = false;
        this.error_msg = '';
        let userdata = result.data;
        this.service.setLoggedInUser(userdata);
        this.router.navigate(['/account']);
      }
    }, error => {
      this.loading = false;
      this.has_error = true;
      this.error_msg = error.statusText;
    });
  }

}
