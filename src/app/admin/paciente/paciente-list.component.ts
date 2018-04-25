
// angular
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// api
import { PacienteValidation } from './../services/api/models';

// components
import { BaseListComponent } from './../common/components';

// services

import { DataContext } from './../services/api/rest';
import { EntityService, ModalDialogService, BusyIndicatorService, NotifierService } from '../../core';

import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

@Component({
  selector: 'paciente',
  templateUrl: './paciente-list.component.html'
})

export class PacienteListComponent extends BaseListComponent<PacienteValidation>  {
  items: AfoListObservable<any[]>;
  temp: AfoListObservable<any[]>;
  public keyName: string = 'id';
  public fieldFilterModel: any = null;
  public formMetaData: any = null;
  
  constructor(protected afoDatabase: AngularFireOfflineDatabase, protected titleService: Title,
    protected entityService: EntityService, 
    protected modalDialogService: ModalDialogService, 
    protected busyIndicatorService: BusyIndicatorService, 
    protected notifierService: NotifierService,
    private datacontextService: DataContext,
    router: Router,
    activatedRoute: ActivatedRoute,
  ) {
    super(titleService, entityService, modalDialogService, busyIndicatorService, notifierService, datacontextService.NcgValidationApi, router, activatedRoute);

    this.formMetaData = require('./paciente.metaData.json'); 
    this.componentName = 'PacienteListComponent';
    this.items = afoDatabase.list('/pacientes');
    this.generateFilterModel();
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

  getFitro(filtro: string){
    this.items=this.afoDatabase.list('/pacientes',{
      query:{
        orderByChild:'nombre',
        equalTo:filtro
      }
    });
  }

  updateFilter(event) {
    let query=null;
    const val = event.target.value;
    console.log(val);
    if (val==""){
      this.items = this.afoDatabase.list('/pacientes');
    }
    else{
      this.getFitro(val);
    }
  }
  reiniciarLista()
  {
    this.items = this.afoDatabase.list('/pacientes');
  }
}
