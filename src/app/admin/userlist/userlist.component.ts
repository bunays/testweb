import { Component, OnInit,TemplateRef } from '@angular/core';
import Swal from "sweetalert2";
import {AdminService} from '../../_service/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { PagerService } from "../../_service/pager.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FormBuilder,Validators,FormGroup} from '@angular/forms';
import {UserService} from '../../_service/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  arryallUserData =[];
  arryOfUserDetailsData =[];
  modalRef: BsModalRef;
  objSelected :any;
  UserForm:FormGroup;
  UpdateForm:FormGroup;
  formUserSearch:FormGroup;
  intGlblUserId:any;


  pager: any = {};
  intTotalCount = 0;
  intPageLimit = 10;
  pageLimit: any[];
  intSkipCount = 0;

  constructor(
    private pageServiceObj: PagerService,
    private adminSrv: AdminService,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: BsModalService,
    private userSRV:UserService
  ) { }

  ngOnInit(): void {
    this.pageLimit = this.pageServiceObj.showPagelist;
    this.getAllUserList();

    this.UserForm = this.formBuilder.group({
      'txtName': ['', <any>Validators.required],
      'noofproduct': ['', <any>Validators.required],
      'plan': ['', <any>Validators.required],
      'rate': ['', <any>Validators.required],
      'totalsale': ['', <any>Validators.required],
      'txtstatus': ['Active', <any>Validators.required],
    });

    this.formUserSearch = this.formBuilder.group({
      'txtName': [""],
      'email': [""],
      'mobile': [""]
    });

    this.UpdateForm = this.formBuilder.group({
      'message': [""],
    });


  }

  getAllUserList() {
    let skipCount = this.intSkipCount;

    if (this.pager.intSkipCount) {
      skipCount = this.pager.intSkipCount;
    }
    try {
      var objData = {
        intSkipCount: skipCount,
        intPageLimit: this.intPageLimit,
      }
      
      this.userSRV.get_user_list(objData).subscribe((res: any) => {
        if (res && res.success === true) {

          this.arryallUserData = res.data[0]
          this.intTotalCount = res.data[1].intTotalCount;
          this.pager = this.pageServiceObj.getPager(
            this.intTotalCount,
            this.pager.currentPage,
            this.intPageLimit
          );
        } else {
          console.log(res);
        }
      },(error:HttpErrorResponse) => {

        console.log(error.error);
        if( error.message === "token expired"){
          this.router.navigate( ['./admin']);
        }
    });
    } catch (error) {
    }

  }
 
  getPageLimit(value$) {
    this.intPageLimit = value$;
    this.setPage(1);
  }

  setPage(page) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pageServiceObj.getPager(
      this.intTotalCount,
      page,
      this.intPageLimit
    );
    this.getAllUserList();
  }

  onCreate(){
    this.router.navigate(['/add-user']);
  }



}
