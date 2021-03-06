// angular
import { Injectable } from '@angular/core';

// models
import { IPacienteValidation } from './../models';

// services
import { BaseApiLocal } from './../../../common/services/api/BaseApiLocal';
import { LocalQueryHelper } from './../../../common/services/api/LocalQueryHelper';
import { AfoListObservable, AngularFireOfflineDatabase,AfoObjectObservable } from 'angularfire2-offline/database';
'use strict';

@Injectable()
export class NcgValidationApiLocal extends BaseApiLocal<IPacienteValidation> {
  public list: IPacienteValidation[];
  public keyName: string = 'id';
  public resourceName: string = 'ncgValidation';

  constructor(_LocalQueryHelper: LocalQueryHelper,afoDatabase: AngularFireOfflineDatabase) {
    super(_LocalQueryHelper,afoDatabase);

    this.setListData();
  }

  convertTo(list: any): IPacienteValidation[] {
    let listToReturn: IPacienteValidation[] = [];

    list.forEach(
      (item) => {
        listToReturn.push(item);
      });
    return listToReturn;
  }

  protected setListData() {
    let ncgValidationSampleData = require('./NcgValidation.json');

    this.list = this.convertTo(ncgValidationSampleData.value);
  }
}
