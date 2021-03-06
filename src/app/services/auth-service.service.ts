import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user = new Subject();
  constructor(
    private httpClient: HttpClient
  ) { }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  register(user) {
    return this.httpClient.post(`${environment.SERVER_ADDRESS}/user/register/`, user);
  }

  is_user_login() {
    return this.httpClient.get(`${environment.SERVER_ADDRESS}/is/user/login/`);
  }

  login(user) {
    return this.httpClient.post(`${environment.SERVER_ADDRESS}/user/login/`, user);
  }

  logout() {
    return this.httpClient.get(`${environment.SERVER_ADDRESS}/user/logout/`);
  }

}
