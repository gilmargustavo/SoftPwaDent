// angular
import { Injectable } from '@angular/core';

// models
import { Tenant } from './../models';
import { AfoListObservable, AngularFireOfflineDatabase,AfoObjectObservable } from 'angularfire2-offline/database';
// services
import { BaseApiLocal } from './../../../controllers/services/api/BaseApiLocal';
import { LocalQueryHelper } from './../../../controllers/services/api/LocalQueryHelper';

'use strict';

import {MdSnackBar, MdSnackBarConfig} from '@angular/material';

@Injectable()
export class TenantApiLocal extends BaseApiLocal<Tenant> {
  public list: Tenant[];
  public keyName: string = 'id';
  public resourceName: string = 'tenant';

  constructor(_LocalQueryHelper: LocalQueryHelper,afoDatabase: AngularFireOfflineDatabase,public snackBar: MdSnackBar) {
    super(_LocalQueryHelper,afoDatabase,snackBar);

    this.setListData();
  }

  convertTo(list: any): Tenant[] {
    let listToReturn: Tenant[] = [];

    list.forEach(
      (item) => {
        listToReturn.push(item);
      });
    return listToReturn;
  }

  protected setListData() {
    let tenantSampleData = require('./Tenant.json');

    this.list = this.convertTo(tenantSampleData.value);
  }
}
