// angular
import { Injectable } from '@angular/core';

// models
import { DefaultValidation } from './../models';

// services
import { BaseApiLocal } from './../../../controllers/services/api/BaseApiLocal';
import { LocalQueryHelper } from './../../../controllers/services/api/LocalQueryHelper';
import { AfoListObservable, AngularFireOfflineDatabase,AfoObjectObservable } from 'angularfire2-offline/database';
'use strict';

import {MdSnackBar, MdSnackBarConfig} from '@angular/material';

@Injectable()
export class DefaultValidationApiLocal extends BaseApiLocal<DefaultValidation> {
  public list: DefaultValidation[];
  public keyName: string = 'id';
  public resourceName: string = 'defaultValidation';

  constructor(_LocalQueryHelper: LocalQueryHelper,afoDatabase: AngularFireOfflineDatabase,public snackBar: MdSnackBar) {
    super(_LocalQueryHelper,afoDatabase,snackBar);

    this.setListData();
  }

  convertTo(list: any): DefaultValidation[] {
    let listToReturn: DefaultValidation[] = [];

    list.forEach(
      (item) => {
        listToReturn.push(item);
      });
    return listToReturn;
  }

  protected setListData() {
    let defaultValidationSampleData = require('./DefaultValidation.json');

    this.list = this.convertTo(defaultValidationSampleData.value);
  }
}
