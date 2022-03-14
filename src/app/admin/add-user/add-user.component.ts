
import { Component, OnInit,TemplateRef } from '@angular/core';
import Swal from "sweetalert2";
import {AdminService} from '../../_service/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { PagerService } from "../../_service/pager.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FormBuilder,Validators,FormGroup} from '@angular/forms';
import { PasswordStrengthValidator } from "./password-strength.validators";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  arryallUserData =[];
  arryOfUserDetailsData =[];
  modalRef: BsModalRef;
  objSelected :any;
  UserForm:FormGroup;
  UpdateForm:FormGroup;
  frmTaskSarchData:FormGroup;
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
  ) { }

  ngOnInit(): void {
    this.pageLimit = this.pageServiceObj.showPagelist;
    this.getAllUserList();

    this.UserForm = this.formBuilder.group({
      'txtemail': ['', [Validators.required, Validators.email]],
      'txtpassword': ['', [Validators.required,Validators.minLength(8),PasswordStrengthValidator]],
      
    });

    this.frmTaskSarchData = this.formBuilder.group({
      'txtName': [""],
      'plan': [""],
      'city': [""],
      'cmbTaskStatus':  [""],

    });

    this.UpdateForm = this.formBuilder.group({
      'message': [""],

    });


  }

  get getControl() { return this.UserForm.controls; }

  openModal(template: TemplateRef<any>,objData:any) {
    this.objSelected =objData;

    this.modalRef = this.modalService.show(template);

    this.intGlblUserId = objData.pkIntsubCategoryId

    this.UserForm.patchValue({txtName: objData.name});
    this.UserForm.patchValue({noofproduct: objData.noofproduct});
    this.UserForm.patchValue({rate: objData.rate});
    this.UserForm.patchValue({totalsale: objData.totalsale});
    this.UserForm.patchValue({txtstatus: objData.status});
    this.UserForm.patchValue({plan: objData.plan});
  }

  getAllUserList() {
    // let skipCount = this.intSkipCount;

    // if (this.pager.intSkipCount) {
    //   skipCount = this.pager.intSkipCount;
    // }
    // try {
    //   var objData = {
    //     intSkipCount: skipCount,
    //     intPageLimit: this.intPageLimit,
    //   }
    //   this.adminSrv.getAllUserList(objData).subscribe(res => {
    //     if (res && res.success === true) {

    //       this.arryallUserData = res.data[0]
    //       this.intTotalCount = res.data[1].intTotalCount;
    //       this.pager = this.pageServiceObj.getPager(
    //         this.intTotalCount,
    //         this.pager.currentPage,
    //         this.intPageLimit
    //       );
    //     } else {
    //       console.log(res);
    //     }
    //   },(error:HttpErrorResponse) => {

    //     console.log(error.error);
    //     if( error.message === "token expired"){
    //       this.router.navigate( ['./account']);
    //     }
    // });
    // } catch (error) {
    // }

    this.arryallUserData = [
      {
        id:1,
        name:"bunays",
        email:"bunays@gmail.com",
        city:"uae",
        plan:"plan .",
        noofproduct:1,
        rate:1,
        totalsale:500,
        phone_no:"89562314788",
        adress:"pulika house ",
        status:"Active"
      },
      {
        id:2,
        name:"awad",
        city:"abu dubai",
        email:"awad@gmail.com",
        plan:"plan .",
        noofproduct:6,
        rate:2,
        totalsale:1000,
        adress:"yud jjd house ",
        phone_no:"98565458555",
        status:"Active"
      },
      {
        id:2,
        name:"jamshi",
        city:"dubai",
        email:"jamshi@gmail.com",
        plan:"plan .",
        noofproduct:16,
        rate:5,
        totalsale:780,
        adress:"ullikand house ",
        phone_no:"8956231478",
        status:"Inactive"
      },
      {
        id:4,
        name:"althaf",
        city:"dubai",
        email:"althaf@gmail.com",
        plan:"plan .",
        noofproduct:26,
        rate:3,
        totalsale:850,
        adress:"ttsys d house",
        phone_no:"32545898888",
        status:"Active"
      },
    ],
            //  this.arryallUserData = this.arryallUserData
            // console.log("ddddddddd",this.arryallUserData)
          this.intTotalCount =this.arryallUserData.length;
          this.pager = this.pageServiceObj.getPager(
            this.intTotalCount,
            this.pager.currentPage,
            this.intPageLimit
          );
  }

  clear(){

    this.UpdateForm.patchValue({message:null});
  }

  updateStatus(obj,status){
    console.log("ssssssssssssssss",obj)

  


  }

  Edituser(obj){
    try {

      if(obj.txtName && obj.cmbDetailCategoryType ){

        var objData ={
          pkIntsubCategoryId: this.intGlblUserId,
          name : obj.txtName,
          email :obj.txtemail,
          mobile  : obj.txtmobile,
          status : obj.txtstatus,
        }

        this.adminSrv.update_user_Details(objData).subscribe(res => {
          if (res && res.success === true) {
            Swal.fire({
              title: "Updated!",
              text: "User Updated Successfully",
              icon: "success",
            })
              this.arryOfUserDetailsData=res.data[0]
              this.getAllUserList();
              // this.cancel();
          } else {
            Swal.fire("Error!", res.message, "error");
          }

        },(error:HttpErrorResponse) => {
          // Swal.fire("warning!", error.message, "warning");
          console.log(error.error);
          if( error.message === "token expired"){
          this.router.navigate(['']);
          }
        });


      }else{
        Swal.fire("warning!", "Missing required parameter ", "warning");
      }

    } catch (error) {
      Swal.fire("Error!", error, "error");

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



}
