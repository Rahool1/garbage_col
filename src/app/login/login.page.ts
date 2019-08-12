import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.is_user_login();
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Validation Message',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  is_user_login() {
    this.authService.is_user_login().subscribe((res: any) => {
      if (res.status) {
        localStorage.setItem("user", JSON.stringify(res.user));
        this.router.navigate(['complaints'], {skipLocationChange: true});
      }
    });
  }

  login(form) {
    this.authService.login(form.value).subscribe((res: any) => {
      if (res.status) {
        localStorage.setItem("user", JSON.stringify(res.user));
        this.router.navigate(['complaints'], {skipLocationChange: true});
      } else {
        this.presentAlert(res.validation);
      }
    });
  }
}
