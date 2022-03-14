import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { ErrorComponent } from './error/error.component';
  const routes: Routes = [

    // {
    //   path: "",
    //   redirectTo: "LandingPage",
    //   pathMatch: "full"
    // },

    // { path: 'LandingPage', component: LandingPageComponent},
    // { path: 'Contactpage', component: ServiceComponent},
   

    { path: "", redirectTo: "admin", pathMatch: "full" },
    { path: 'admin', loadChildren: () => import('./accounts/accounts.module').then(x => x.AccountsModule) },
    {
      path: '',
      loadChildren: () => import('./admin/admin.module').then(x => x.AdminModule)
    },
    // { path: '**', component: ErrorComponent},

  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
