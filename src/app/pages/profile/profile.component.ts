import { Component, OnInit } from '@angular/core';
import { HttpServicesService } from 'src/app/services/http-services.service';
import { Router } from '@angular/router';
import { Students, CountryContext } from 'src/app/models';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public loading: boolean;
  has_error = false;
  error_msg = '';

  userdata: Students;
  countries: CountryContext[] = [];
  dob = '';
  avatar = 'assets/img/avatar/avatar-chef-0.png';
  levels: string[] = [
    "100L", "200L", "300L", "400L", "500L", "OTHER"
  ];
  
  constructor(private service: HttpServicesService, private router: Router, private authService: AuthService) {
    this.userdata = this.authService.getAuthenticatedUser();
   }

  ngOnInit() {
    this.GetCountries();
  }

  GetCountries(){
    this.service.GetCountries().subscribe((result) => {
      if(result.statusCode === '00'){
        this.countries = result.countries;
      }
    })
  }

  SaveProfile(userdata){
    this.loading = true;
    this.has_error = false;
    this.error_msg = '';

    this.service.UpdateStudentDetails(userdata).subscribe((result) => {
      this.loading = false;
      this.has_error = true;
      this.error_msg = result.statusMessage;
      if(result.statusCode == '00'){
        this.authService.setLoggedInUser(userdata);
      }
    }, error => {
      this.loading = false;
      this.has_error = true;
      this.error_msg = 'Network error';
    });
  }
}
