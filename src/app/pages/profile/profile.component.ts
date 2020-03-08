import { Component, OnInit } from '@angular/core';
import { HttpServicesService } from 'src/app/services/http-services.service';
import { Router } from '@angular/router';
import { Students, CountryContext } from 'src/app/models';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public loading: boolean;
  has_error = false;
  error_msg = '';

  public fullName = localStorage.getItem('fullName');
  public userId = localStorage.getItem('userId');
  userdata: Students;
  countries: CountryContext[] = [];
  dob = '';
  avatar = 'assets/img/avatar/avatar-chef-0.png';
  
  constructor(private service: HttpServicesService, private router: Router) { }

  ngOnInit() {
    this.GetCustomerDetail();
    this.GetCountries();
  }

  GetCustomerDetail(){
    this.service.GetStudentDetailById(+this.userId).subscribe((result) => {
      if(result !== null){
        this.userdata = result;
        this.dob = moment(result.dob).format('YYYY-MM-DD');
        if(result.photo.length > 0){
          this.avatar = result.photo;
        }
      }
    });
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
    userdata.dob = this.dob;
    // let country = this.countries.filter(x => x.countryId === userdata.countryId);
    // let country2 = this.countries.filter(x => x.countryName === 'Nigeria');
    // userdata.country = country.length > 0 ? country[0].countryName : 'Nigeria';
    // userdata.countryId = userdata.countryId === 0 ? country2[0].countryId : userdata.countryId;
    this.service.UpdateCustomerDetails(userdata).subscribe((result) => {
      this.loading = false;
      this.has_error = true;
      this.error_msg = result.statusMessage;
    });
  }
}
