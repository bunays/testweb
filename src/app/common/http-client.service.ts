import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {Http, Headers, Response} from '@angular/http';


import 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Rx'

@Injectable()
export class HttpClientService {

  private api: string = environment.apiUrl;

  constructor(
    private http: Http,
  ) { }

   static createAuthorizationHeader(headers: Headers) {
    // const token =  JSON.parse(localStorage.getItem('token'));
    // headers.append('authorization',  token);
// console.log("sho ----",token)
  }

  /*
  @Function: All Api Post Method Set token in header (Authorization', 'bearer ')
  */
 loginPost(url, data) {
  // console.log('posting:', url, data);
  const headers = new Headers();
  return this.http.post(`${this.api}` + url, data, {headers: headers});
}


  post(url, data) {
    const headers = new Headers();
    HttpClientService.createAuthorizationHeader(headers);
    return this.http.post(`${this.api}` + url, data, { headers: headers });
  }

  postcontact(url, data) {
    // const headers = new Headers();
    // HttpClientService.createAuthorizationHeader(headers);
    return this.http.post(`${this.api}` + url, data,);
  }

/*
  @Function: All Api Get Method Set token in header (Authorization', 'bearer ')
  */
  get(url) {
    const headers = new Headers();
    HttpClientService.createAuthorizationHeader(headers);
    return this.http.get(`${this.api}` + url, { headers: headers });
  }

  put(url, data) {
    const headers = new Headers();
    HttpClientService.createAuthorizationHeader(headers);
    return this.http.put(`${this.api}` + url, data, { headers: headers });
  }

  public  hamdleError(response: Response): Observable<any> {
    let errorMessage: any;
    errorMessage = `${response.status} - ${response.statusText}`;
    return Observable.throw('Server Error', errorMessage);
  }
}
