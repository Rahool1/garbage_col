import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private networkService: NetworkService,
    private router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() { }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Validation Message',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  getOTP(form) {
    this.networkService.getOTP(form.value)
      .subscribe(((res: any) => {
        if (!res.status) {
          this.presentAlert(res.validation);
        }
      }))
  }

  forgotPassword(form) {
    this.networkService.changePassword(form.value)
      .subscribe(((res: any) => {
        if (res.status) {
          this.presentAlert(res.validation);
          this.router.navigate(['login'], {skipLocationChange: true});
        } else {
          this.presentAlert(res.validation);
        }
      }))
  }

}
