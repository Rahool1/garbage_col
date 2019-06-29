import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../services/network.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-new-complaint',
  templateUrl: './new-complaint.page.html',
  styleUrls: ['./new-complaint.page.scss'],
})
export class NewComplaintPage implements OnInit {

  wards = [];
  base64Image = "assets/img/200.png";

  constructor(
    private networkService: NetworkService,
    private camera: Camera,
    public alertController: AlertController,
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
    this.getWards();
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Enquiry',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  getWards() {
    this.networkService.getWards()
      .subscribe((wards => {
        this.wards = wards['data'];
      }))
  }

  getGeolocationPoints(enquiry){
    this.geolocation.getCurrentPosition().then((resp) => {
      enquiry.value.lat = resp.coords.latitude;
      enquiry.value.lang = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  registerEnquiry(enquiry) {
    this.getGeolocationPoints(enquiry);
    this.networkService.registerComplaint(enquiry.value)
      .subscribe((res: any) => {
        if (res.status){
          this.presentAlert(res.validation);
        }
      })
  }

  capturePhoto(form: any) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      form.value.location_pic = this.base64Image;
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }

}
