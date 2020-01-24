import { Component, OnInit } from '@angular/core';

import { NavController, Platform, MenuController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { AuthServiceService } from './services/auth-service.service';
import { NetworkService } from './services/network.service';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  user;
  counter = 0;
  languages = [{ "status": 'en', "name": "English" }, { "status": 'mr', "name": "Marathi" }]
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthServiceService,
    private networkService: NetworkService,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    private alertController: ToastController,
    private languageService: LanguageService
  ) {
    this.initializeApp();
  }
  

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user;
    })
    this.languageService._initTranslate();
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

  updateLanguage(evt) {
    console.log(evt.target.value)
    this.networkService.updateLanguage({"language": evt.target.value})
    .subscribe((res: Response)=>{
      if (res.status){
        console.log("Language changed")
        this.languageService._translateLanguage(evt.target.value);
      }
    })
  }

}
