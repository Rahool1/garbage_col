import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../services/network.service';


@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.page.html',
  styleUrls: ['./complaint.page.scss'],
})
export class ComplaintPage implements OnInit {

  complaint;

  constructor(
    private networkService: NetworkService
  ) {
    this.complaint = this.networkService.vComplaint;
  }

  ngOnInit() {
  }

}
