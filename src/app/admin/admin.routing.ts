// angular
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { AdminComponent } from './admin.component';

import { HomeComponent, HomeItemComponent, HomeListComponent } from './home';
import { DefaultValidationComponent, DefaultValidationItemComponent, DefaultValidationListComponent } from './defaultValidation';
import { NcgOtherComponent, NcgOtherItemComponent, NcgOtherListComponent } from './ncgOther';
import { NcgTypeAndFormatComponent, NcgTypeAndFormatItemComponent, NcgTypeAndFormatListComponent } from './ncgTypeAndFormat';
import { PacienteComponent, PacienteItemComponent, PacienteListComponent} from './paciente';
import { SomeItemComponent, SomeItemItemComponent, SomeItemListComponent } from './someItem';
import { TenantComponent, TenantItemComponent, TenantListComponent } from './tenant';
import { AntPatPersonaleComponent, AntPatPersonalItemComponent, AntPatPersonalListComponent } from './antPatPesonal';
import { UserComponent, UserItemComponent, UserListComponent } from './user';
import { ValidationComponent, ValidationItemComponent, ValidationListComponent } from './validation';

const AdminRoutes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      {
        path: 'home', component: HomeComponent,
        children: [
          { path: '', component: HomeListComponent },
          { path: ':id', component: HomeItemComponent }
        ]
      },
      {
        path: 'defaultValidation', component: DefaultValidationComponent,
        children: [
          { path: '', component: DefaultValidationListComponent },
          { path: ':id', component: DefaultValidationItemComponent }
        ]
      },
      {
        path: 'ncgOther', component: NcgOtherComponent,
        children: [
          { path: '', component: NcgOtherListComponent },
          { path: ':id', component: NcgOtherItemComponent }
        ]
      },
      {
        path: 'ncgTypeAndFormat', component: NcgTypeAndFormatComponent,
        children: [
          { path: '', component: NcgTypeAndFormatListComponent },
          { path: ':id', component: NcgTypeAndFormatItemComponent }
        ]
      },
      {
        path: 'paciente', component: PacienteComponent,
        children: [
          { path: '', component: PacienteListComponent },
          { path: ':$key', component: PacienteItemComponent }
        ]
      },
      {
        path: 'someItem', component: SomeItemComponent,
        children: [
          { path: '', component: SomeItemListComponent },
          { path: ':id', component: SomeItemItemComponent }
        ]
      },
      {
        path: 'tenant', component: TenantComponent,
        children: [
          { path: '', component: TenantListComponent },
          { path: ':id', component: TenantItemComponent }
        ]
      },
      {
        path: 'antPatPersonal', component: AntPatPersonaleComponent,
        children: [
          { path: '', component: AntPatPersonalListComponent },
          { path: ':$key', component: AntPatPersonalItemComponent }
        ]
      },
      {
        path: 'user', component: UserComponent,
        children: [
          { path: '', component: UserListComponent },
          { path: ':id', component: UserItemComponent }
        ]
      },
      {
        path: 'validation', component: ValidationComponent,
        children: [
          { path: '', component: ValidationListComponent },
          { path: ':id', component: ValidationItemComponent }
        ]
      },
      // set the default path here
      {
        path: '',
        component: HomeComponent
      },
      
      // { path: '',   redirectTo: '/admin/defaultTypeAndFormat', pathMatch: 'full' }
    ]
  }
];

// export const routing: ModuleWithProviders = RouterModule.forChild(AdminRoutes);
@NgModule({
  imports: [RouterModule.forChild(AdminRoutes)], // , { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

export const routedComponents = [AdminComponent
  , HomeComponent, HomeItemComponent, HomeListComponent
  , DefaultValidationComponent, DefaultValidationItemComponent, DefaultValidationListComponent
  , NcgOtherComponent, NcgOtherItemComponent, NcgOtherListComponent
  , NcgTypeAndFormatComponent, NcgTypeAndFormatItemComponent, NcgTypeAndFormatListComponent
  , PacienteComponent, PacienteItemComponent, PacienteListComponent
  , SomeItemComponent, SomeItemItemComponent, SomeItemListComponent
  , TenantComponent, TenantItemComponent, TenantListComponent
  , AntPatPersonaleComponent, AntPatPersonalItemComponent, AntPatPersonalListComponent
  , UserComponent, UserItemComponent, UserListComponent
  , ValidationComponent, ValidationItemComponent, ValidationListComponent
];