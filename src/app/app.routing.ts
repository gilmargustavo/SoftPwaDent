import { Routes,RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './adminLayout/admin-layout.component';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';


/*export const AppRoutes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  children: [{
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule'
  }]
}];*/
const appRoutes: Routes = [
  { path: '', component: AdminLayoutComponent,loadChildren: 'app/admin/admin.module#AdminModule',canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];


export const routing = RouterModule.forRoot(appRoutes);