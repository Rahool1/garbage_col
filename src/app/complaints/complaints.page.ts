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
  selectedDate: String = new Date().toISOString();
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
    var data = { date: (new Date(this.selectedDate)).getTime() }
    this.networkService.getComplaints(data)
      .subscribe((complaints => {
        this.complaints = complaints['data'];
      }))
  }
  viewComplaint(complaint) {
    complaint.location_pic = environment.SERVER_ADDRESS+'/'+complaint.location_pic;
    this.networkService.vComplaint = complaint;
    this.router.navigateByUrl('complaint');
  }



}
