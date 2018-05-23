// angular
import { Injectable } from '@angular/core';

// models
import { AntPatPersonal } from './../models';

// services
import { BaseApiLocal } from './../../../controllers/services/api/BaseApiLocal';
import { LocalQueryHelper } from './../../../controllers/services/api/LocalQueryHelper';
import { AfoListObservable, AngularFireOfflineDatabase,AfoObjectObservable } from 'angularfire2-offline/database';
'use strict';

import {MdSnackBar, MdSnackBarConfig} from '@angular/material';

@Injectable()
export class TypeOfTypeApiLocal extends BaseApiLocal<AntPatPersonal> {
  public list: AntPatPersonal[];
  public keyName: string = 'id';
  public resourceName: string = 'typeOfType';

  constructor(_LocalQueryHelper: LocalQueryHelper,afoDatabase: AngularFireOfflineDatabase,public snackBar: MdSnackBar) {
    super(_LocalQueryHelper,afoDatabase,snackBar);

    this.setListData();
  }

  convertTo(list: any): AntPatPersonal[] {
    let listToReturn: AntPatPersonal[] = [];

    list.forEach(
      (item) => {
        listToReturn.push(item);
      });
    return listToReturn;
  }

  protected setListData() {
    let typeOfTypeSampleData = require('./TypeOfType.json');

    this.list = this.convertTo(typeOfTypeSampleData.value);
  }
}
