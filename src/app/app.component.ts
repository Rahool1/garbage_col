import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
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

  user = {first_name:"", last_name:""};

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthServiceService,
    public menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")): this.user;
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
