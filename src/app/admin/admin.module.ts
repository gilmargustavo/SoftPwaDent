// angular
import { NgModule } from '@angular/core';

// providers/services
import { ServiceModule } from './services/service.module';
import { AdminCommonModule } from './controllers/admin-common.module';
import {MdTooltipModule} from '@angular/material';
import { MaterialModule } from '@angular/material';
import { MdSnackBarModule } from '@angular/material';


// routing
import { AdminRoutingModule, routedComponents } from './admin.routing';

@NgModule({
  declarations: [routedComponents],
  imports: [AdminCommonModule.forRoot(), MdTooltipModule,MaterialModule,MdSnackBarModule,AdminRoutingModule, ServiceModule],
  entryComponents: [routedComponents]
})

export class AdminModule { }


