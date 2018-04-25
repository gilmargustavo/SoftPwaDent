// angular
import { Injectable } from '@angular/core';

// models
import { NcgOther } from './../models';

// services
import { BaseApiLocal } from './../../../common/services/api/BaseApiLocal';
import { LocalQueryHelper } from './../../../common/services/api/LocalQueryHelper';
import { AfoListObservable, AngularFireOfflineDatabase,AfoObjectObservable } from 'angularfire2-offline/database';
'use strict';

@Injectable()
export class NcgOtherApiLocal extends BaseApiLocal<NcgOther> {
  public list: NcgOther[];
  public keyName: string = 'id';
  public resourceName: string = 'ncgOther';

  constructor(_LocalQueryHelper: LocalQueryHelper,afoDatabase: AngularFireOfflineDatabase) {
    super(_LocalQueryHelper,afoDatabase);

    this.setListData();
  }

  convertTo(list: any): NcgOther[] {
    let listToReturn: NcgOther[] = [];

    list.forEach(
      (item) => {
        listToReturn.push(item);
      });
    return listToReturn;
  }

  protected setListData() {
    let ncgOtherSampleData = require('./NcgOther.json');

    this.list = this.convertTo(ncgOtherSampleData.value);
  }
}
