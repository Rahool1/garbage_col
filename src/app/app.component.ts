import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Complaints',
      url: '/complaints',
      icon: 'list'
    },
    {
      title: 'Add Complaints',
      url: '/new-complaint',
      icon: 'list'
    }
  ];

  user = "";

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthServiceService,
    public menuCtrl: MenuController
  ) {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.router.navigate(['login']);
    // this.router.navigate(['complaints']);
    // this.router.navigate(['new-complaint']);
  }
  logoutClicked() {
    this.authService.logout()
      .subscribe((res: Response) => {
        if (res.status) {
          this.menuCtrl.toggle();
          localStorage.removeItem("user");
          this.router.navigate(['login']);
        }
      })
  }
}
