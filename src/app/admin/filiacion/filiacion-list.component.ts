
// angular
import { Component,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// api
import { PacienteValidation } from './../services/api/models';

// components
import { BaseListComponent } from './../controllers/components';

// services
import { DataContext } from './../services/api/rest';
import { EntityService, ModalDialogService, BusyIndicatorService, NotifierService } from '../../core';

import { AfoListObservable, AngularFireOfflineDatabase, AfoObjectObservable } from 'angularfire2-offline/database';

@Component({
  selector: 'filiacionList',
  templateUrl: './filiacion-list.component.html',
  styles:[`
  .borde{
    margin-top:10px;
  }
    `]
})

export class FiliacionListComponent extends BaseListComponent<PacienteValidation>  {
  @ViewChild('myTable') table: any;
  items: AfoListObservable<any[]>;
  temp: AfoListObservable<any[]>;
  paciente: AfoObjectObservable<any>;
  public keyName: string = 'id';
  public fieldFilterModel: any = null;
  public formMetaData: any = null;
  desplegar1=true;
  desplegar2=false;

  constructor(protected afoDatabase: AngularFireOfflineDatabase, titleService: Title,
    protected entityService: EntityService,
    protected modalDialogService: ModalDialogService,
    protected busyIndicatorService: BusyIndicatorService,
    protected notifierService: NotifierService,
    private datacontextService: DataContext,
    router: Router,
    activatedRoute: ActivatedRoute,
  ) {
    super(titleService, entityService, modalDialogService, busyIndicatorService, notifierService, datacontextService.NcgValidationApi, router, activatedRoute);

    this.formMetaData = require('./filiacion.metaData.json');
    this.componentName = 'pacientes';
    this.items = afoDatabase.list('/pacientes');
   // this.generateFilterModel();
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


  /*public generateFilterModel() {
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
  }*/

  public onSort(event) {
    this.updateSort(event.sorts[0].prop);
  }

  public numPagesUpdated(event) { }

  protected populateComponentDataAsync() {
  }

  getFitro(filtro: string) {
    this.items = this.afoDatabase.list('/pacientes', {
      query: {
        orderByChild: 'ci',
        equalTo: filtro
      }
    });
  }

  updateFilter(event) {
    let query = null;
    const val = event.target.value;
    console.log(val);
    if (val == "") {
      this.items = this.afoDatabase.list('/pacientes');
    }
    else {
      this.getFitro(val);
    }
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  cambio1(){
    this.desplegar1=false;
    this.desplegar2=true;
}

cambio2(){
  this.desplegar1=true;
    this.desplegar2=false;
}
}
