
import { Component, OnInit,TemplateRef } from '@angular/core';
import Swal from "sweetalert2";
import {UserService} from '../../_service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: BsModalService,
    private userSRV:UserService
  ) { }

  ngOnInit(): void {

    this.UserForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required,Validators.minLength(8),PasswordStrengthValidator]],
      'prePassword': ['', [Validators.required,Validators.minLength(8),PasswordStrengthValidator]],
      'firstName': [""],
      'lastName': [""],
      'userName': [""],
      'mobile': [""],
    });

  }

  get getControl() { return this.UserForm.controls; }

  createUser(obj){
    console.log("skosdy 00----",obj)
    try {

      if( this.getControl.password.value === this.getControl.prePassword.value){
       
        var objData ={
          email : obj.email,
          userName :obj.userName,
          firstName  : obj.firstName,
          lastName  : obj.lastName,
          mobile  : obj.mobile,
          password  : obj.password
        }

        this.userSRV.register_user(objData).subscribe(res => {
          console.log("res shoe in here =---",res)
          if (res && res.success === true) {
            Swal.fire({
              title: "Saved!",
              text: "Registered Successfully",
              icon: "success",
            })
              this.arryOfUserDetailsData=res.data[0];
              this.router.navigate(['/userlist']);
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
        Swal.fire("warning!", "Password Miss Match", "warning");
      }

    } catch (error) {
      Swal.fire("Error!", error, "error");

    }

  }


}
