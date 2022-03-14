import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { NgImageSliderModule } from 'ng-image-slider';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HttpClientService } from './common/http-client.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import {  NgxSlickJsModule } from 'ngx-slickjs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HttpModule,
    CarouselModule.forRoot(),
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgImageSliderModule,
    SlickCarouselModule,
     NgxSlickJsModule,
    BsDropdownModule.forRoot() ,

    // NgbCarouselModule,
    // SlickCarouselModule

  ],
  providers: [HttpClientService,
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // { provide: LocationStrategy, useClass: HashLocationStrategy }
    // // provider used to create fake backend
    // fakeBackendProvider
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
