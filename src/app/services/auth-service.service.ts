import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:1992';
  authSubject  =  new  BehaviorSubject(false);

  constructor(
    private  httpClient: HttpClient
  ) { }


  register(user) {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/user/register/`, user);
  }

  is_user_login() {
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/is/user/login/`);
  }

  login(user) {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/user/login/`, user);
  }

}
