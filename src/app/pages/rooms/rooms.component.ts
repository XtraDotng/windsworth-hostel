import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  public loading: boolean;
  has_error = false;
  error_msg = '';

  public fullName = localStorage.getItem('fullName');
  public userId = localStorage.getItem('userId');

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

  constructor() { }

  ngOnInit() {
  }

  Book(roomType){
    this.loading = true;
    this.has_error = false;
    this.error_msg = '';
    setTimeout(() => {
      this.loading = false;
      this.has_error = true;
      this.error_msg = 'Your booking for ' + roomType.room_type + ' cannot be processed at this moment. Please try again later';
    }, 2000);
    // console.log(roomType);
  }

  Reserve(roomType){
    this.loading = true;
    this.has_error = false;
    this.error_msg = '';
    setTimeout(() => {
      this.loading = false;
      this.has_error = true;
      this.error_msg = 'Your reservation for ' + roomType.room_type + ' cannot be processed at this moment. Please try again later';
    }, 2000);
    // console.log(roomType);
  }
}
