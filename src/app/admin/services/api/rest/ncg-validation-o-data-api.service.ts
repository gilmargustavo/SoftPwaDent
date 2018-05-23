// angular
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

// 3rd party
import * as Rx from 'rxjs';

// services
import { BaseApi } from './../../../controllers/services/api/BaseApi';
import { Error } from './../../../controllers/services/api/Error';
import { HttpHelper } from './../../../controllers/services/api/HttpHelper';

import { AfoListObservable, AngularFireOfflineDatabase,AfoObjectObservable } from 'angularfire2-offline/database';

import { IPacienteValidation } from './../models';

'use strict';

@Injectable()
export class NcgValidationApi extends BaseApi<IPacienteValidation> {
  public keyName: string = '';
  public resourceName: string = 'ncgValidation';
  public defaultHeaders: Headers = new Headers({});

  constructor(protected http: Http,protected afoDatabase: AngularFireOfflineDatabase) {
    super(http,afoDatabase);
  }
}