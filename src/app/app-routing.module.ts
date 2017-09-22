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
      path: 'home',
      component: HomeComponent
    }, {
      path: 'dashboard/:id',
      canActivate: [AuthGuard],
      component: DashboardComponent
    }, {
      path: 'dashboard',
      pathMatch: 'full',
      redirectTo: 'dashboard/59c3ecb56f197830243f9961'
    }, {
      path: '',
      pathMatch: 'full',
      redirectTo: 'dashboard/59c3ecb56f197830243f9961'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
