
// angular
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// api
import { AntPatPersonal } from './../services/api/models';

// components
import { BaseListComponent } from './../common/components';

// pipes
import { DisplayDataTransformPipe } from './../common/pipes';

import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

// services
import { LocalStorageService, RestoreService } from './../common/services';
import { DataContext } from './../services/api/rest';
import { EntityService, ModalDialogService, BusyIndicatorService, NotifierService } from '../../core';

@Component({
  selector: 'antPatPersonal',
  templateUrl: './antPatPersonal-list.component.html'
})

export class AntPatPersonalListComponent extends BaseListComponent<AntPatPersonal>  {

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
    super(titleService, entityService, modalDialogService, busyIndicatorService, notifierService, datacontextService.TypeOfTypeApi, router, activatedRoute);

    this.formMetaData = require('./antPatPersonal.metaData.json'); 
    this.componentName = 'patoPersonales';
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

  deleteItem(key: string) {
    this.isLoading = true;
    const msg = `¿Esta seguro de eliminar el paciente?`;
    this.modalDialogService.activate(msg).then(responseOK => {
      if (responseOK) {
        this.items.remove(key);
      }
    });
  }
}
