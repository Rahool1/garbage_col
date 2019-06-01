import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.page.html',
  styleUrls: ['./complaints.page.scss'],
})
export class ComplaintsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  viewComplaint() {
    this.router.navigateByUrl('complaint');
  }

}
