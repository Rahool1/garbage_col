import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NetworkService } from '../services/network.service';
import { environment } from 'src/environments/environment';
import { ActionSheetController } from '@ionic/angular';
import { AuthServiceService } from '../services/auth-service.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.page.html',
  styleUrls: ['./complaints.page.scss'],
})
export class ComplaintsPage implements OnInit {
  complaints = []
  selectedDate = new Date().toISOString();
  user;
  id;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private networkService: NetworkService,
    private authService: AuthServiceService,
    public actionSheetController: ActionSheetController,
    public languageService: LanguageService
  ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.status) {
        this.id = params.status;
        this.getComplaints(params.status);
      }
    });
  }
  
  ngOnInit() {
    this.user = this.authService.getUser()
    this.getComplaints('4');
  }


  getComplaints(status) {
    var data = {
      // date: (new Date(this.selectedDate)).getTime(),
      group: this.user.group,
      status: this.id != undefined ? Number(this.id): Number(status)
    };
    this.networkService.getComplaints(data)
      .subscribe((complaints) => {
        this.complaints = complaints['data'];
      });
  }
  viewComplaint(complaint) {
    complaint['location_picture'] = environment.SERVER_ADDRESS + '/' + complaint.location_pic;
    this.networkService.vComplaint = complaint;
    this.router.navigate(['complaint'], { skipLocationChange: true, replaceUrl: true });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [{
        text: 'Inprogress',
        // icon: 'trash',
        handler: () => {
          console.log('Inprogress clicked');
        }
      }, {
        text: 'Complete',
        // icon: 'share',
        handler: () => {
          console.log('Complete clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
