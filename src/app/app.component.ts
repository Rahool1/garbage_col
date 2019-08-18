import { Component, OnInit } from '@angular/core';

import { NavController, Platform, MenuController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public appPages = [
    {
      title: 'Add Complaints',
      url: '/new-complaint',
      icon: 'clipboard'
    }
  ];
  user;
  counter = 0;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthServiceService,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    private alertController: ToastController
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.authService.user.subscribe(user=>{
      this.user = user;
    })
    if (this.user && this.user.group != 'CUSTOMER') {
      this.appPages.splice(1, 1);
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      message: "Press again to exit",
      duration: 3000
    });
    await alert.present();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.platform.backButton.subscribe((res) => {
        if (this.counter == 0) {
          this.counter++;
          this.presentAlert();
          setTimeout(() => { this.counter = 0 }, 3000)
        } else {
          navigator['app'].exitApp();
        }
      });
    });
    if (this.user) {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          status: 0
        },
        skipLocationChange: true,
        replaceUrl: true
      };
      this.router.navigate(['complaints'], navigationExtras);
    } else {
      this.router.navigate(['login'], { skipLocationChange: true, replaceUrl: true });
    }
  }
  logoutClicked() {
    this.authService.logout()
      .subscribe((res: Response) => {
        if (res.status) {
          this.menuCtrl.toggle();
          localStorage.removeItem('user');
          this.router.navigate(['login'], { skipLocationChange: true, replaceUrl: true });
        }
      });
  }
  status(comp, id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        status: id
      },
      skipLocationChange: true,
      replaceUrl: true
    };
    console.log(navigationExtras);
    this.router.navigate(['complaints'], navigationExtras);
  }

}
