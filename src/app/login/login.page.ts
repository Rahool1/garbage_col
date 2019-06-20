import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  message = "";

  constructor(private authService: AuthServiceService,
              private router: Router) { }

  ngOnInit() {
    this.is_user_login();
  }

  is_user_login() {
    this.authService.is_user_login().subscribe((res) => {
      if (res.status){
        localStorage.setItem("user", JSON.stringify(res.user));
        this.router.navigateByUrl('complaints');
      }
    });
  }

  login(form) {
    this.authService.login(form.value).subscribe((res) => {
      if (res.status){
        localStorage.setItem("user", JSON.stringify(res.user));
        this.router.navigateByUrl('complaints');
      }else{
        this.message = res.validation;
      }
    });
  }
}
