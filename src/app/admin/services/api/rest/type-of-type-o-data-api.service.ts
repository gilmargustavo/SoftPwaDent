// angular
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

// 3rd party
import * as Rx from 'rxjs';

import { AfoListObservable, AngularFireOfflineDatabase,AfoObjectObservable } from 'angularfire2-offline/database';

// services
import { BaseApi } from './../../../controllers/services/api/BaseApi';
import { Error } from './../../../controllers/services/api/Error';
import { HttpHelper } from './../../../controllers/services/api/HttpHelper';

import { AntPatPersonal } from './../models';

'use strict';

@Injectable()
export class TypeOfTypeApi extends BaseApi<AntPatPersonal> {
  public keyName: string = '';
  public resourceName: string = 'typeOfType';
  public defaultHeaders: Headers = new Headers({});

  constructor(protected http: Http,protected afoDatabase: AngularFireOfflineDatabase) {
    super(http,afoDatabase);
  }
}