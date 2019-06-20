import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  SERVER_ADDRESS:  string  =  'http://localhost:3000';
  serviceSubject  =  new  BehaviorSubject(false);

  constructor(private  httpClient: HttpClient) { }


  complaint(complaint): Observable<any> {
    console.log(complaint);
    return this.httpClient.post(`${this.SERVER_ADDRESS}/complaint`, complaint).pipe(
      tap(async (res: any ) => {
        this.serviceSubject.next(true);
      })

    );
  }

  getComplaints(): Observable<any> {
    return this.httpClient.get(`${this.SERVER_ADDRESS}/complaints`).pipe(
      tap(async (res: any ) => {
        this.serviceSubject.next(true);
      })
    );
  }

  getWards(): Observable<any> {
    return this.httpClient.get(`${this.SERVER_ADDRESS}/wards`).pipe(
      tap(async (res: any ) => {
        this.serviceSubject.next(true);
      })
    );
  }

}
