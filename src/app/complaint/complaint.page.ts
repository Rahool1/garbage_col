import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../services/network.service';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  ILatLng,
  Marker,
  BaseArrayClass
} from '@ionic-native/google-maps';
import { Router } from '@angular/router';
import { Platform, AlertController } from "@ionic/angular";
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.page.html',
  styleUrls: ['./complaint.page.scss'],
})
export class ComplaintPage implements OnInit {

  complaint;
  user;
  map: GoogleMap;

  constructor(
    private networkService: NetworkService,
    private platform: Platform,
    private router: Router,
    private alertController: AlertController,
    public languageService: LanguageService
  ) {
    this.complaint = this.networkService.vComplaint;
    this.user = this.networkService.getUserDetails();
  }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {
    let latLng = { lat: this.complaint.lat, lng: this.complaint.lang };
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: latLng,
        zoom: 15
      }
    });
    var markerData = {
      position: latLng,
      iconData: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACVUlEQVRIS8WWjVXCMBRGwwTqBMIEuAG4ARuIE6gTKBOgEyAT4AbABjKBMIE/C+h3m6S2pWlJ8BzfOTkpad6770teEzom3bZy/VbrpYTopDjJZ6w2c77X6p9j46SCUXvuYDxHq04BZ2rPHXa3y/DRqlPAmdqZW+hrkMZEq44F52q3oGTdrjEpqmPBudoxKVBVKqsU1THgPbW+klNUt4GHCn6idqEGuMveerUeXFGtNTCvah9qaz+n2gMmKMGBnLrfjPFcMirZ7231XUF19RUJkIhPZqXnT8AM9Osy62v0VPihUqIfjWwx1RkJvbxIpjArhabfbEJ6zQYwysiiT3CW8kJ6Q4BgqMALEnqVNAqQZGSkM/R7nMOBLhZ/B/ZQeg9V/1EsrpLy5dIqP8aAXV6WlQIlZrWq/wzeBK0DM3Y0vA0aAh8FPwTaBC7B2W8+qUOMT4l9dYUUrJK2k4tCOHl7O7zK+Xx69nbWU/iebgKz1+9E+OYPToR1fqOe+SquujeBWdzlYGBPohhjW9b2lGbRa72bwLdyml5d2auvaPyeTOzIw4MxzCkal8h8no3cqT3WJd0ExuFmOjXmlhRIXbnfKZQ7hfJ4HDTM8wVIMi6xJ01y3mV8E5glGlDRGIEKS75DrAtFn/0DA3x/b0ddZbPgGt23JnBW0agpKPzUGCvhoT4iv1HG9Zodtc6HGBTYnoXAXc3UR5SbBwK1d8y+8RUAzxNwU2orOwQeyolF/lLT7mUqQ8BqCj4Bt+j1lR0Cs3Sopt8GFLYNF/2JU7K2k6stePL7fwP/AER2xy+mY1/QAAAAAElFTkSuQmCC"
    }
    let marker: Marker = this.map.addMarkerSync(markerData);
  }

  gotoResolve() {
    this.router.navigate(['resolve-complaint'], { skipLocationChange: true, replaceUrl: true });
  }

  inprogress() {
    let obj = {
      id: this.complaint.id,
      status_id: 4
    };
    this.networkService.changeComplaintStatus(obj)
      .subscribe((res: any) => {
        if (res.status) {
          this.presentAlert(res.validation);
        }
      });
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Enquiry',
      message: msg,
      buttons: [{
        text: 'OK',
        handler: () => {
          alert.dismiss().then(() => {
            this.router.navigate(['complaints'], { skipLocationChange: true, replaceUrl: true });
          });
          return false;
        }
      }]
    });
    await alert.present();
  }

}
