// angular
import { Injectable } from '@angular/core';

// models
import { Validation } from './../models';

// services
import { BaseApiLocal } from './../../../controllers/services/api/BaseApiLocal';
import { LocalQueryHelper } from './../../../controllers/services/api/LocalQueryHelper';
import { AfoListObservable, AngularFireOfflineDatabase,AfoObjectObservable } from 'angularfire2-offline/database';
'use strict';

import {MdSnackBar, MdSnackBarConfig} from '@angular/material';

@Injectable()
export class ValidationApiLocal extends BaseApiLocal<Validation> {
  public list: Validation[];
  public keyName: string = 'id';
  public resourceName: string = 'validation';

  constructor(_LocalQueryHelper: LocalQueryHelper,afoDatabase: AngularFireOfflineDatabase,public snackBar: MdSnackBar) {
    super(_LocalQueryHelper,afoDatabase,snackBar);

    this.setListData();
  }

  convertTo(list: any): Validation[] {
    let listToReturn: Validation[] = [];

    list.forEach(
      (item) => {
        listToReturn.push(item);
      });
    return listToReturn;
  }

  protected setListData() {
    let validationSampleData = require('./Validation.json');

    this.list = this.convertTo(validationSampleData.value);
  }
}
