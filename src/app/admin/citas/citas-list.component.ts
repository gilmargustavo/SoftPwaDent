
// angular
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// api
import { Tenant } from './../services/api/models';

// components
import { BaseListComponent } from './../controllers/components';

// pipes
import { DisplayDataTransformPipe } from './../controllers/pipes';

// services
import { LocalStorageService, RestoreService } from './../controllers/services';
import { DataContext } from './../services/api/rest';
import { EntityService, ModalDialogService, BusyIndicatorService, NotifierService } from '../../core';

import { AfoListObservable, AngularFireOfflineDatabase ,AfoObjectObservable} from 'angularfire2-offline/database';

@Component({
  selector: 'citasList',
  templateUrl: './citas-list.component.html',
  styles:[`
  .borde{
    margin-top:10px;
  }
    `]
})

export class CitasListComponent extends BaseListComponent<Tenant>  {

  pacientes: AfoListObservable<any[]>;
  doctores: AfoListObservable<any[]>;
  citas: AfoListObservable<any[]>;
  temp: AfoListObservable<any[]>;
  paciente: AfoObjectObservable<any>;
  pac=false;
  doc=true;

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
    super(titleService, entityService, modalDialogService, busyIndicatorService, notifierService, datacontextService.TenantApi, router, activatedRoute);

    this.formMetaData = require('./citas.metaData.json'); 
    this.componentName = 'citas';
    this.pacientes = afoDatabase.list('/pacientes');
    this.citas = afoDatabase.list('/citas');
    this.doctores = afoDatabase.list('/doctores');

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

  public buscarCita(keyPaciente:string ) {
    this.citas = this.afoDatabase.list('/citas', {
      query: {
        orderByChild: 'idPaciente',
        equalTo: keyPaciente
      }
    });
  }


  public buscarCita1(keyPaciente:string ) {
    this.citas = this.afoDatabase.list('/citas', {
      query: {
        orderByChild: 'idDoctor',
        equalTo: keyPaciente
      }
    });
  }


  getFitro(filtro: string) {
    this.pacientes = this.afoDatabase.list('/pacientes', {
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
      this.pacientes = this.afoDatabase.list('/pacientes');
    }
    else {
      this.getFitro(val);
    }
  }

  paci(){
    this.pac=false;
    this.doc=true;
  }
  doct(){
    this.pac=true;
    this.doc=false;
  }

  getFitro1(filtro: string) {
    this.citas = this.afoDatabase.list('/citas', {
      query: {
        orderByChild: 'fecha',
        equalTo: filtro
      }
    });
  }

  updateFilter1(event) {
    let query = null;
    const val = event.target.value;
    console.log(val);
    if (val == "") {
      this.citas = this.afoDatabase.list('/citas');
    }
    else {
      this.getFitro1(val);
    }
  }

  getFitro2(filtro: string) {
    this.doctores = this.afoDatabase.list('/doctores', {
      query: {
        orderByChild: 'ci',
        equalTo: filtro
      }
    });
  }

  updateFilter2(event) {
    let query = null;
    const val = event.target.value;
    console.log(val);
    if (val == "") {
      this.doctores = this.afoDatabase.list('/doctores');
    }
    else {
      this.getFitro2(val);
    }
  }

  public numPagesUpdated(event) { }

  protected populateComponentDataAsync() {
  }
}
