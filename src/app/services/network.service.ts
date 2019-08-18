import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  vComplaint = {};
  constructor(private httpClient: HttpClient) { }

  getUserDetails() {
    try{
      return JSON.parse(localStorage.getItem("user"));
    } catch(e) {  
      console.log(e);
    }
  }

  registerComplaint(complaint) {
    return this.httpClient.post(`${environment.SERVER_ADDRESS}/create/user/enquiry/`, complaint);
  }

  getComplaints(data) {
    return this.httpClient.post(`${environment.SERVER_ADDRESS}/user/enquires/`, data);
  }

  getWards() {
    return this.httpClient.get(`${environment.SERVER_ADDRESS}/get/active/wards/`);
  }
  
  getSubWards(data) {
    return this.httpClient.post(`${environment.SERVER_ADDRESS}/get/sub/wards/`, data);
  }

  changeComplaintStatus(complaint) {
    return this.httpClient.post(`${environment.SERVER_ADDRESS}/change/enquiry/status/`, complaint);
  }
  
  getOTP(data) {
    return this.httpClient.post(`${environment.SERVER_ADDRESS}/user/send/otp/`, data)
  }
  
  changePassword(data) {
    return this.httpClient.post(`${environment.SERVER_ADDRESS}/user/forgot/password/`, data)
  }

}
