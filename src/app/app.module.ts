
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { MaterialModule } from '@angular/material';
import {MdTooltipModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './adminLayout/admin-layout.component';
//import { AppRoutes } from './app.routing';
import { CoreModule } from './core/core.module';
import { MenuItems } from './admin/admin.menu';

import { routing }        from './app.routing';

//Conexión con la base de datos en firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireOfflineModule } from 'angularfire2-offline';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './admin/services/api/auth/auth.service';


import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';


import 'hammerjs';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    MaterialModule,
    MdTooltipModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireOfflineModule,
    AngularFireAuthModule,
    BrowserModule,
    CoreModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    routing,
    //RouterModule.forRoot(AppRoutes),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    
  ],
  providers: [MenuItems,AuthGuard,AlertService,AuthenticationService, UserService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    },],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }