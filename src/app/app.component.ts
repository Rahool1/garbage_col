import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
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
  ) {
    this.initializeApp();
    this.user = JSON.parse(localStorage.getItem("user"));
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
}
