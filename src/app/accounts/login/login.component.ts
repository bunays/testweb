import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import Swal from "sweetalert2";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AdminService  } from '../../_service/admin.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  arryAdminDetails:[];
  admindetails:any
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private adminSRV: AdminService,

  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      txtemail: ['', [Validators.required, Validators.email]],
      txtpassword: ['', [Validators.required]],
      // rememberMe: [false, Validators.requiredTrue]
    });

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/device';
  }

  // convenience getter for easy access to form fields
  get getControl() { return this.loginForm.controls; }

  onSubmitHandler() {
    this.submitted = true;

  }

  login(value) {
    if (value.txtpassword) {

      const objUser = {
        email: value.txtemail,
        password: value.txtpassword,
      };

      this.adminSRV.admin_login(objUser).subscribe(res => {
console.log("res ---------------",res)
        if (res.success === true) {
          Swal.fire({
            title: "Login",
            text: "Logined  Successfully",
            icon: "success",
          })

          localStorage.setItem('admin_details',  JSON.stringify(res.data));
          this.router.navigate( ['/userlist']);
          this.arryAdminDetails = JSON.parse(localStorage.getItem('admin_details'));
            if (res.data) {
              localStorage.setItem('token',  JSON.stringify(res.data.access_token));
            }
        } else {
          Swal.fire("warning!", res.message, "warning");
        }
      },(error:HttpErrorResponse) => {
        // Swal.fire("warning!", 'Login Faild', "warning");
        console.log(error.error);
        if( error.message === "token expired"){
          this.router.navigate( ['./account']);
        }
    });

    }
  }


}
