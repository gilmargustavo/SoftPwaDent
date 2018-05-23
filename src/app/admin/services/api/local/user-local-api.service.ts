// angular
import { Injectable } from '@angular/core';

// models
import { User } from './../models';

// services
import { BaseApiLocal } from './../../../controllers/services/api/BaseApiLocal';
import { LocalQueryHelper } from './../../../controllers/services/api/LocalQueryHelper';
import { AfoListObservable, AngularFireOfflineDatabase,AfoObjectObservable } from 'angularfire2-offline/database';
'use strict';

import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
@Injectable()
export class UserApiLocal extends BaseApiLocal<User> {
  public list: User[];
  public keyName: string = 'id';
  public resourceName: string = 'user';

  constructor(_LocalQueryHelper: LocalQueryHelper,afoDatabase: AngularFireOfflineDatabase,public snackBar: MdSnackBar) {
    super(_LocalQueryHelper,afoDatabase,snackBar);

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
