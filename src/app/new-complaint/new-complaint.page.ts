import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../services/network.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-new-complaint',
  templateUrl: './new-complaint.page.html',
  styleUrls: ['./new-complaint.page.scss'],
})
export class NewComplaintPage implements OnInit {

  wards = [];
  fileToUpload: File = null;

  constructor(
    private networkService: NetworkService,
    private camera: Camera
  ) { }

  ngOnInit() {
    this.getWards();
  }

  getWards() {
    this.networkService.getWards()
      .subscribe((wards => {
        this.wards = wards['data'];
      }))
  }
  registerEnquiry(enquiry) {
    console.log(enquiry);
    alert(enquiry.value.title);
    alert(JSON.stringify(enquiry.value));
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
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);
      form.value.image = base64Image;
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }

}
