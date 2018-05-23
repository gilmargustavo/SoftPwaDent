// angular
import { Injectable } from '@angular/core';

// models
import { NcgTypeAndFormat } from './../models';

// services
import { BaseApiLocal } from './../../../controllers/services/api/BaseApiLocal';
import { LocalQueryHelper } from './../../../controllers/services/api/LocalQueryHelper';
import { AfoListObservable, AngularFireOfflineDatabase,AfoObjectObservable } from 'angularfire2-offline/database';
'use strict';

import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
@Injectable()
export class NcgTypeAndFormatApiLocal extends BaseApiLocal<NcgTypeAndFormat> {
  public list: NcgTypeAndFormat[];
  public keyName: string = 'id';
  public resourceName: string = 'ncgTypeAndFormat';

  constructor(_LocalQueryHelper: LocalQueryHelper,afoDatabase: AngularFireOfflineDatabase,public snackBar: MdSnackBar) {
    super(_LocalQueryHelper,afoDatabase,snackBar);

    this.setListData();
  }

  convertTo(list: any): NcgTypeAndFormat[] {
    let listToReturn: NcgTypeAndFormat[] = [];

    list.forEach(
      (item) => {
        listToReturn.push(item);
      });
    return listToReturn;
  }

  protected setListData() {
    let ncgTypeAndFormatSampleData = require('./NcgTypeAndFormat.json');

    this.list = this.convertTo(ncgTypeAndFormatSampleData.value);
  }
}
