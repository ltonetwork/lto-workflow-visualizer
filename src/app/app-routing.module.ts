import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SessionResolveGuard, AuthGuard } from '@modules/auth';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [{
  path: '',
  canActivate: [SessionResolveGuard],
  children: [
    {
      path: 'login',
      loadChildren: 'app/pages/login/login.module#LoginModule'
    }, {
      path: 'dashboard/:id',
      canActivate: [AuthGuard],
      component: DashboardComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
