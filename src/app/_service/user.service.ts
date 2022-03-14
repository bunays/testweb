import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment} from '../../environments/environment';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import {Http, Headers, Response} from '@angular/http';
import { HttpClientService } from '../common/http-client.service';
import { throwError, concat, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api: string = environment.apiUrl;

  constructor(
    private router: Router,
    // private httpa: Http,
    private http: HttpClient,
    private https: HttpClientService

  ) {}

  save_user(obj){
    return this.https.post('/api/user/SaveUserDetails', obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  user_login(obj){
    console.log("ssss",obj)
    return this.https.post('/api/user/auth/login',obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  logout() {
      // remove user from local storage and set current user to null
      localStorage.clear();
    //  this.userSubject.next(null);
      this.router.navigate(['/admin']);
  }

  save_Booking_Details(obj){
    return this.https.post('/api/rental/booking/SaveBookingDetails',obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  User_Register(obj){
    return this.https.post('/api/user/auth/signup',obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  update_user_details(obj){
    return this.https.post('/api/rental/user/UpdateUserDetails',obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  uploadFiles(objUpload) {
    const formData = new FormData();
    const {file,  } = objUpload;

    formData.append('file', file);
    // formData.append('strUserId', strUserId);
   // formData.append('intLoginUserId', intLoginUserId);

    return this.http.post(`${this.api}/api/Upload/file_upload`, formData, {
      reportProgress: true,
      observe: 'events'
    }).map((event) => {
      return event;
    }).catch(this.https.hamdleError);

  }






}
