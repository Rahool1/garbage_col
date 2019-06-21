import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../services/network.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.page.html',
  styleUrls: ['./complaints.page.scss'],
})
export class ComplaintsPage implements OnInit {
  complaints = []
  constructor(
    private router: Router,
    private networkService: NetworkService
  ) { }

  ngOnInit() {
    this.getComplaints();
  }


  getComplaints() {
    var data = { date: (new Date).getTime() }
    this.networkService.getComplaints(data)
      .subscribe((complaints => {
        this.complaints = complaints['data'];
      }))
  }
  viewComplaint() {
    this.router.navigateByUrl('complaint');
  }



}
