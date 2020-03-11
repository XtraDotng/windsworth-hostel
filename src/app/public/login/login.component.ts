import { Component, OnInit } from '@angular/core';
import { HttpServicesService } from 'src/app/services/http-services.service';
import { LoginRequest } from 'src/app/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loading: boolean;
  has_error = false;
  error_msg = '';

  email = '';
  password = '';  

  constructor(private service: HttpServicesService, private router: Router) { }

  ngOnInit() {
    this.LogOut();
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
        return false;
      }
      this.has_error = false;
      this.error_msg = '';
      let userdata = result.data;
      localStorage.setItem('isLoggedin', 'true');
      localStorage.setItem('userId', userdata.id.toString());
      localStorage.setItem('student_id', userdata.student_id);
      localStorage.setItem('fullName', userdata.first_name + ' ' + userdata.last_name);
      this.router.navigate(['/account']);
    }, error => {
      this.loading = false;
      this.has_error = true;
      this.error_msg = error.statusText;
    });
  }

  LogOut(){
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('userId');
    localStorage.removeItem('fullName');
    this.router.navigate(['/home/login']);
  }

}
