import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:3000';
  authSubject  =  new  BehaviorSubject(false);

  constructor(private  httpClient: HttpClient) { }


  register(user): Observable<any> {
    console.log(user);
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
      tap(async (res: any ) => {

        if (res.user) {
          this.authSubject.next(true);
        }
      })

    );
  }

  login(user): Observable<any> {
    console.log(user);
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
      tap(async (res: any ) => {

        if (res.user) {
          this.authSubject.next(true);
        }
      })

    );
  }

}
