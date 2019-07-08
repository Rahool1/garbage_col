import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../services/network.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resolve-complaint',
  templateUrl: './resolve-complaint.page.html',
  styleUrls: ['./resolve-complaint.page.scss'],
})
export class ResolveComplaintPage implements OnInit {

  base64Image = "assets/img/200.png";
  complaint: any;
  constructor(public networkService: NetworkService,
    private camera: Camera,
    private router: Router,
    public alertController: AlertController) {

    }

    ngOnInit() {
      this.complaint = this.networkService.vComplaint;
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
        form.value.comment_pic = this.base64Image;
      }, (err) => {
        console.log(err);
      });
    }

    changeStatus(enquiry) {
      enquiry.value.comment_pic = 'data:image/jpeg;base64,asdasdasddas djasndnasdn3213i123n12i3ni21n3';
      enquiry.value.id = this.complaint.id;
      enquiry.value.status_id = 1;

      this.networkService.changeComplaintStatus(enquiry.value)
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
            alert.dismiss().then(() => { this.router.navigateByUrl('complaints'); });
            return false;
          }
        }]
      });
      await alert.present();
    }

    cancel(enquiry) {
      enquiry.value.id = this.complaint.id;
      enquiry.value.status_id = 2;

      this.networkService.changeComplaintStatus(enquiry.value)
      .subscribe((res: any) => {
        if (res.status) {
          this.presentAlert(res.validation);
        }
      });
    }

  }
