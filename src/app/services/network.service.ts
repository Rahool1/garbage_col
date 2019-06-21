import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private httpClient: HttpClient) { }

  complaint(complaint) {
    return this.httpClient.post(`${environment.SERVER_ADDRESS}/complaint`, complaint)
  }

  getComplaints(data) {
    return this.httpClient.post(`${environment.SERVER_ADDRESS}/user/enquires/`, data)
  }

  getWards() {
    return this.httpClient.get(`${environment.SERVER_ADDRESS}/get/active/wards/`)
  }

}
