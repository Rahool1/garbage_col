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
    // {
    //   title: 'Complaints',
    //   url: '/complaints?status=0',
    //   icon: 'list'
    // },
    {
      title: 'Add Complaints',
      url: '/new-complaint',
      icon: 'clipboard'
    }
  ];
  user;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthServiceService,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    private toast: ToastController
  ) {
    this.initializeApp();
  }

  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user && this.user.group != 'CUSTOMER') {
      this.appPages.splice(1, 1);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.platform.backButton.subscribe(() => {
        console.log(this.router.url);
        if(this.router.url.includes('complaints') || this.router.url.includes('/login') || this.router.url.includes('new-complaint')) {
          if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
            navigator['app'].exitApp();
          } else {
            this.lastTimeBackPress = new Date().getTime();
          }
        }
      });
    });
    if (localStorage.getItem('user')) {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          status: 0
        },
        skipLocationChange: true
      };
      console.log(navigationExtras);
      this.router.navigate(['complaints'], navigationExtras);
    } else {
      this.router.navigate(['login'], {skipLocationChange: true});
    }
  }
  logoutClicked() {
    this.authService.logout()
    .subscribe((res: Response) => {
      if (res.status) {
        this.menuCtrl.toggle();
        localStorage.removeItem("user");
        this.router.navigate(['login'], {skipLocationChange: true});
      }
    });
  }
  status(comp, id) {
    console.log(id);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        status: id
      },
      skipLocationChange: true
    };
    console.log(navigationExtras);
    this.router.navigate(['complaints'], navigationExtras);
  }

}
