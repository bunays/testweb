import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment} from '../../environments/environment';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import {Http, Headers, Response} from '@angular/http';
import { HttpClientService } from '../common/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private api: string = environment.apiUrl;

  constructor(
    private router: Router,
    // private httpa: Http,
    private http: HttpClient,
    private https: HttpClientService

  ) {}

  admin_login(obj){
    return this.https.post('/api/admin/auth/login', obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  update_user_Details(obj){
    return this.https.post('/api/admin/UpdateUserDetails', obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  update_UserStatus_Details(obj){
    return this.https.post('/api/admin/UpdateStatusUserDetails', obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  getAllUserList(obj){
    return this.https.post('/api/admin/getListAllUserDetails',obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  save_Category_Details(obj){
    return this.https.post('/api/category/Savenewcategory',obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  update_CategoryStatus_Details(obj){
    return this.https.post('/api/category/UpdateCategoryStatusDetails',obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  update_subCategoryStatus_Details(obj){
    return this.https.post('/api/subCategory/UpdateSubCategoryStatusDetails',obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  update_Category_Details(obj){
    return this.https.post('/api/category/UpdateCategoryDetails',obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  update_subCategory_Details(obj){
    return this.https.post('/api/subCategory/UpdatesubCategoryDetails',obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }


  get_All_Category_List(obj){
    return this.https.post('/api/category/getListAllCategoryDetails',obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }


  getAllProductList(obj){
    return this.https.post('/api/product/getListAllProductDetails',obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  update_productStatus_Details(obj){
    return this.https.post('/api/Product/UpdateProductStatusDetails',obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }


  getAllBookingList(obj){
    return this.https.post('/api/admin/booking/getListAllBookingDetails',obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }


  save_Subcategory_Details(obj){
    return this.https.post('/api/subCategory/SavenewsubCategory',obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  getAllSubcategoryList(obj){
    return this.https.post('/api/subCategory/getListAllCategoryDetails',obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  save_SubscriptionPlan_Details(obj){
    return this.https.post('/api/SubscriptionPlan/SavenewSubscriptionPlan',obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  get_SubscriptionPlan_List(obj){
    return this.https.post('/api/subscription/getListAllsubscriptionDetails',obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  save_City_Details(obj){
    return this.https.post('/api/city/SavenewCity',obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  get_city_List(obj){
    return this.https.post('/api/city/getListAllCityDetails',obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  update_City_Details(obj){
    return this.https.post('/api/City/UpdateCityDetails',obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  update_CityStatus_Details(obj){
    return this.https.post('/api/City/UpdateCityDetails',obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  save_settings_Details(obj){
    return this.https.post('/api/admin/add_edit_settings',obj)
    .map(res => res.json())
    .catch(this.https.hamdleError);
  }

  get_settings_List(obj){
    return this.https.post('/api/admin/list_settings',obj)
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
