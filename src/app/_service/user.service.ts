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

  ) {
    
  }
  
  user_login(obj){
    return this.https.post('/api/auth/login', obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  register_user(obj){
    return this.https.post('/api/auth/signup', obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  get_user_list(param: any){
    return this.https.get('/api/user/getListAllUserDetails', param )
    .map(res => res.json())
    .catch(this.https.hamdleError);
  
  }

  // get_user_list(param: any){
  //   return this.https.post('/api/user/getListAllUserDetails', param )
  //   .map(res => res.json())
  //   .catch(this.https.hamdleError);
  
  // }


  logout() {
    localStorage.clear();
    this.router.navigate(['/admin']);
  }



}
