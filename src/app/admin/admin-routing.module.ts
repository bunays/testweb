import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ErrorComponent } from '../error/error.component';
import {AuthGuard} from '../_helpers/auth.guard';
import { UserlistComponent } from '../admin/userlist/userlist.component';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "userlist", pathMatch: "full" },
      { path: 'userlist', component: UserlistComponent },
      { path: 'add-user', component: AddUserComponent },
     
    ]
  },
  // {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
