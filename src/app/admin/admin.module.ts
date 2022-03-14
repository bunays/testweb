import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import {SidebarComponent} from '../common/sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import {NavigationComponent} from '../common/navigation/navigation.component';
import { UserlistComponent } from '../admin/userlist/userlist.component';
import { AddUserComponent } from './add-user/add-user.component';



@NgModule({
  declarations: [
    SidebarComponent,
    NavigationComponent,
    LayoutComponent,
    UserlistComponent,
    AddUserComponent
   
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    // ReactiveFormsModule,
    // FormsModule,
    // NgImageSliderModule,
    // PdfViewerModule,
    // AngularMultiSelectModule,

  ]
})

export class AdminModule { }
