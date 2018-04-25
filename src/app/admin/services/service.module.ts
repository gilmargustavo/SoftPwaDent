// angular
import { NgModule } from '@angular/core';

import {
  DataContextLocal,
   DefaultTypeAndFormatApiLocal,
   DefaultValidationApiLocal,
   NcgOtherApiLocal,
   NcgTypeAndFormatApiLocal,
   NcgValidationApiLocal,
   SomeItemApiLocal,
   TenantApiLocal,
   TypeOfTypeApiLocal,
   UserApiLocal,
   ValidationApiLocal,
} from './api/local';

import { DataContext } from './api/rest';
import {UploadService} from './api/services/upload.service';

@NgModule({
  providers: [
    DefaultTypeAndFormatApiLocal,
    DefaultValidationApiLocal,
    NcgOtherApiLocal,
    NcgTypeAndFormatApiLocal,
    NcgValidationApiLocal,
    SomeItemApiLocal,
    TenantApiLocal,
    TypeOfTypeApiLocal,
    UserApiLocal,
    ValidationApiLocal,
    UploadService,
    { provide: DataContext, useClass: DataContextLocal }
  ]
})
export class ServiceModule { }

/* NinjaCodeGen.com by DNAfor.NET */