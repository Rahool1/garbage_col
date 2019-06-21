import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  message = "";

  constructor(private  authService: AuthServiceService,
              private  router: Router) { }

  ngOnInit() {
  }

  register(form) {
    this.authService.register(form.value).subscribe((res: any) => {
      alert(JSON.stringify(res));
      if (res.status){
        localStorage.setItem("user", JSON.stringify(res.user));
        this.router.navigateByUrl('complaints');
      }else{
        this.message = res.validation;
      }
    });
  }
}
