// angular
import { Injectable } from '@angular/core';

// models
import { SomeItem } from './../models';

// services
import { BaseApiLocal } from './../../../common/services/api/BaseApiLocal';
import { LocalQueryHelper } from './../../../common/services/api/LocalQueryHelper';
import { AfoListObservable, AngularFireOfflineDatabase,AfoObjectObservable } from 'angularfire2-offline/database';
'use strict';

@Injectable()
export class SomeItemApiLocal extends BaseApiLocal<SomeItem> {
  public list: SomeItem[];
  public keyName: string = 'id';
  public resourceName: string = 'someItem';

  constructor(_LocalQueryHelper: LocalQueryHelper,afoDatabase: AngularFireOfflineDatabase) {
    super(_LocalQueryHelper,afoDatabase);

    this.setListData();
  }

  convertTo(list: any): SomeItem[] {
    let listToReturn: SomeItem[] = [];

    list.forEach(
      (item) => {
        listToReturn.push(item);
      });
    return listToReturn;
  }

  protected setListData() {
    let someItemSampleData = require('./SomeItem.json');

    this.list = this.convertTo(someItemSampleData.value);
  }
}
