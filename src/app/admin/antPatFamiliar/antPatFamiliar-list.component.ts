
// angular
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// api
import { NcgTypeAndFormat } from './../services/api/models';

// components
import { BaseListComponent } from './../controllers/components';

// pipes
import { DisplayDataTransformPipe } from './../controllers/pipes';

// services
import { LocalStorageService, RestoreService } from './../controllers/services';
import { DataContext } from './../services/api/rest';
import { EntityService, ModalDialogService, BusyIndicatorService, NotifierService } from '../../core';

import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

@Component({
  selector: 'antPatFamiliarList',
  templateUrl: './antPatFamiliar-list.component.html'
})

export class AntPatFamiliarListComponent extends BaseListComponent<NcgTypeAndFormat>  {

  items: AfoListObservable<any[]>;
  temp: AfoListObservable<any[]>;
  public keyName: string = 'id';
  public fieldFilterModel: any = null;
  public formMetaData: any = null;
  
  constructor(protected afoDatabase: AngularFireOfflineDatabase,protected titleService: Title,
    protected entityService: EntityService, 
    protected modalDialogService: ModalDialogService, 
    protected busyIndicatorService: BusyIndicatorService, 
    protected notifierService: NotifierService,
    private datacontextService: DataContext,
    router: Router,
    activatedRoute: ActivatedRoute,
  ) {
    super(titleService, entityService, modalDialogService, busyIndicatorService, notifierService, datacontextService.NcgTypeAndFormatApi, router, activatedRoute);

    this.formMetaData = require('./antPatFamiliar.metaData.json'); 
    this.componentName = 'patoFamiliares';
    this.items = afoDatabase.list('/patoPersonales');

    this.generateFilterModel();
  }

  public generateFilterModel() {
    let filterModel = [];
    if (this.formMetaData && this.formMetaData.properties) {
      for (let key in this.formMetaData.properties) {
        if (this.formMetaData.properties.hasOwnProperty(key)) {
          let element = this.formMetaData.properties[key];

          if (element.type && element['x-ncg']) {
            filterModel.push({
              display: element['x-ncg'].label,
              value: key
            });
          }
        }
      }
    }

    this.fieldFilterModel = filterModel;
  }

  public onSort(event) {
    this.updateSort(event.sorts[0].prop);
  }

  public numPagesUpdated(event) { }

  protected populateComponentDataAsync() {
  }
}
