// angular
import { Injectable } from '@angular/core';

// models
import { DefaultTypeAndFormat } from './../models';

// services
import { BaseApiLocal } from './../../../common/services/api/BaseApiLocal';
import { LocalQueryHelper } from './../../../common/services/api/LocalQueryHelper';
import { AfoListObservable, AngularFireOfflineDatabase,AfoObjectObservable } from 'angularfire2-offline/database';
'use strict';

@Injectable()
export class DefaultTypeAndFormatApiLocal extends BaseApiLocal<DefaultTypeAndFormat> {
  public list: DefaultTypeAndFormat[];
  public keyName: string = 'id';
  public resourceName: string = 'defaultTypeAndFormat';

  constructor(_LocalQueryHelper: LocalQueryHelper,afoDatabase: AngularFireOfflineDatabase) {
    super(_LocalQueryHelper,afoDatabase);

    this.setListData();
  }

  convertTo(list: any): DefaultTypeAndFormat[] {
    let listToReturn: DefaultTypeAndFormat[] = [];

    list.forEach(
      (item) => {
        listToReturn.push(item);
      });
    return listToReturn;
  }

  protected setListData() {
    let defaultTypeAndFormatSampleData = require('./DefaultTypeAndFormat.json');

    this.list = this.convertTo(defaultTypeAndFormatSampleData.value);
  }
}
