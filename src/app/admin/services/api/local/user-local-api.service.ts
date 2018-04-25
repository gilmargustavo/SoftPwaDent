// angular
import { Injectable } from '@angular/core';

// models
import { User } from './../models';

// services
import { BaseApiLocal } from './../../../common/services/api/BaseApiLocal';
import { LocalQueryHelper } from './../../../common/services/api/LocalQueryHelper';
import { AfoListObservable, AngularFireOfflineDatabase,AfoObjectObservable } from 'angularfire2-offline/database';
'use strict';

@Injectable()
export class UserApiLocal extends BaseApiLocal<User> {
  public list: User[];
  public keyName: string = 'id';
  public resourceName: string = 'user';

  constructor(_LocalQueryHelper: LocalQueryHelper,afoDatabase: AngularFireOfflineDatabase) {
    super(_LocalQueryHelper,afoDatabase);

    this.setListData();
  }

  convertTo(list: any): User[] {
    let listToReturn: User[] = [];

    list.forEach(
      (item) => {
        listToReturn.push(item);
      });
    return listToReturn;
  }

  protected setListData() {
    let userSampleData = require('./User.json');

    this.list = this.convertTo(userSampleData.value);
  }
}
