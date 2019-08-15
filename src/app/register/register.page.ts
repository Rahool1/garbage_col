import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  message = "";

  constructor(
    private  authService: AuthServiceService,
    private  router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Validation Message',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  register(form) {
    this.authService.register(form.value).subscribe((res: any) => {
      if (res.status){
        this.router.navigate(['complaints'], {skipLocationChange: true, replaceUrl: true});
      }else{
        this.presentAlert(res.validation);
      }
    });
  }
}
