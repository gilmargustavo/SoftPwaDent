// angular
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { AdminComponent } from './admin.component';

import { HomeComponent, HomeItemComponent, HomeListComponent } from './home';
import { HistorialComponent, HistorialItemComponent, HistorialListComponent } from './historial';
import { OdontogramaComponent, OdontogramaItemComponent, OdontogramaListComponent } from './odontograma';
import { AntPatFamiliarComponent, AntPatFamiliarItemComponent, AntPatFamiliarListComponent } from './antPatFamiliar';
import { PacienteComponent, PacienteItemComponent, PacienteListComponent, AntItemComponent } from './paciente';
import { DoctorComponent, DoctorItemComponent, DoctorListComponent } from './doctor';
import { CitasComponent, CitasItemComponent, CitasListComponent } from './citas';
import { AntPatPersonaleComponent, AntPatPersonalItemComponent, AntPatPersonalListComponent } from './antPatPersonal';
import { UserComponent, UserItemComponent, UserListComponent } from './user';
import { ValidationComponent, ValidationItemComponent, ValidationListComponent } from './validation';
import { LoginComponent, LoginItemComponent, LoginListComponent } from './login';
import { FiliacionComponent, FiliacionItemComponent, FiliacionListComponent } from './filiacion';

const AdminRoutes: Routes = [
  {
    path: 'admin', component: AdminComponent,
    children: [
      {
        path: 'home', component: HomeComponent,
        children: [
          { path: '', component: HomeListComponent },
          { path: ':id', component: HomeItemComponent }
        ]
      },

      {
        path: 'login', component: LoginComponent,
        children: [
          { path: '', component: LoginListComponent },
          { path: 'nuevo', component: LoginItemComponent }
        ]
      },

      {
        path: 'historial', component: HistorialComponent,
        children: [
          { path: '', component: HistorialListComponent },
          { path: ':$key', component: HistorialItemComponent }
        ]
      },
      {
        path: 'odontograma', component: OdontogramaComponent,
        children: [
          { path: '', component: OdontogramaListComponent },
          { path: ':$key', component: OdontogramaItemComponent }
        ]
      },
      {
        path: 'antPatFamiliar', component: AntPatFamiliarComponent,
        children: [
          { path: '', component: AntPatFamiliarListComponent },
          { path: ':$key', component: AntPatFamiliarItemComponent }
        ]
      },
      {
        path: 'paciente', component: PacienteComponent,
        children: [
          { path: '', component: PacienteListComponent },
          { path: ':$key', component: PacienteItemComponent },
          {
            path: 'odontograma', component: PacienteComponent,
            children: [
              { path: '', component: AntItemComponent },
              { path: ':$key', component: AntItemComponent }
            ]
          }
        ]
      },
      {
        path: 'doctor', component: DoctorComponent,
        children: [
          { path: '', component: DoctorListComponent },
          { path: ':$key', component: DoctorItemComponent }
        ]
      },
      {
        path: 'citas', component: CitasComponent,
        children: [
          { path: '', component: CitasListComponent },
          { path: ':$key', component: CitasItemComponent }
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

      {
        path: 'filiacion', component: FiliacionComponent,
        children: [
          { path: '', component: FiliacionListComponent },
          { path: ':$key', component: FiliacionItemComponent }
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
  , HistorialComponent, HistorialItemComponent, HistorialListComponent
  , OdontogramaComponent, OdontogramaItemComponent, OdontogramaListComponent
  , AntPatFamiliarComponent, AntPatFamiliarItemComponent, AntPatFamiliarListComponent
  , PacienteComponent, PacienteItemComponent, PacienteListComponent, AntItemComponent
  , DoctorComponent, DoctorItemComponent, DoctorListComponent
  , CitasComponent, CitasItemComponent, CitasListComponent
  , AntPatPersonaleComponent, AntPatPersonalItemComponent, AntPatPersonalListComponent
  , UserComponent, UserItemComponent, UserListComponent
  , LoginComponent, LoginItemComponent, LoginListComponent
  , FiliacionComponent, FiliacionItemComponent, FiliacionListComponent
  , ValidationComponent, ValidationItemComponent, ValidationListComponent
];