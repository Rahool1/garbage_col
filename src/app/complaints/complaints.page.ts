import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../services/network.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.page.html',
  styleUrls: ['./complaints.page.scss'],
})
export class ComplaintsPage implements OnInit {
  complaints = []
  selectedDate = new Date().toISOString();
  user;
  constructor(
    private router: Router,
    private networkService: NetworkService
  ) { }

  ngOnInit() {
    this.getComplaints();
  }

  onDateChange(){
    this.getComplaints();
  }


  getComplaints() {
    this.user = JSON.parse(localStorage.getItem("user"));
    var data = {
      date: (new Date(this.selectedDate)).getTime(),
      group: this.user.group
    };
    this.networkService.getComplaints(data)
    .subscribe((complaints) => {
      this.complaints = complaints['data'];
    });
  }
  viewComplaint(complaint) {
    complaint['location_picture'] = environment.SERVER_ADDRESS+'/'+complaint.location_pic;
    this.networkService.vComplaint = complaint;
    this.router.navigateByUrl('complaint');
  }



}
