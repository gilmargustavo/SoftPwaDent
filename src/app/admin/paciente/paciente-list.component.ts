// angular
import { Component,ViewChild,ChangeDetectionStrategy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DatePipe} from '@angular/common';
import {TooltipPosition} from '@angular/material';
// api
import { PacienteValidation } from './../services/api/models';

// components
import { BaseListComponent } from './../controllers/components';

// services
import { DataContext } from './../services/api/rest';
import { EntityService, ModalDialogService, BusyIndicatorService, NotifierService } from '../../core';

import { AfoListObservable, AngularFireOfflineDatabase, AfoObjectObservable } from 'angularfire2-offline/database';

@Component({
  selector: 'pacienteList',
  templateUrl: './paciente-list.component.html',
  styles: [`
    .linea{
      display:inline-block;
      margin:2px;
    }


    
    .content {
      min-width: 300px;
      /*height: 400px;*/
    }
  `],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush // make sure tooltip also works OnPush
})

export class PacienteListComponent extends BaseListComponent<PacienteValidation>  {
  @ViewChild('myTable') table: any;
  expanded: any = {};
  items: AfoListObservable<any[]>;
  temp: AfoListObservable<any[]>;
  personales: AfoListObservable<any[]>;
  paciente: AfoObjectObservable<any>;
  patoPersonales: AfoListObservable<any[]>;
  patoFamiliares: AfoListObservable<any[]>;
  historialClinico:AfoListObservable<any[]>;
  public keyName: string = 'id';
  public fieldFilterModel: any = null;
  public formMetaData: any = null;
  timeout: any;
  contador: number;
  sw=true;
  sw1=true;
  desplegar1=true;
  desplegar2=false;

  position: TooltipPosition = 'below';
  message: string = 'Here is the tooltip';
  disabled = false;
  showDelay = 0;
  hideDelay = 1000;

  constructor(protected datePipe: DatePipe,protected afoDatabase: AngularFireOfflineDatabase, titleService: Title,
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
    this.patoFamiliares = afoDatabase.list('/patoFamiliares');
    this.patoPersonales = afoDatabase.list('/patoPersonales');

    this.generateFilterModel();
  }

  deleteItem(key: string) {
    this.isLoading = true;
    const msg = `¿Esta seguro de eliminar el paciente?`;
    this.modalDialogService.activate(msg).then(responseOK => {
      if (responseOK) {
        this.items.remove(key);
        this.mensaje();
      }
    });
  }

  mensaje() {
    const texto = `Paciente eliminado exitosamente`;
    this.notifierService.notify(texto);
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

  getFitro1(filtro: string) {
    this.items = this.afoDatabase.list('/pacientes', {
      query: {
        orderByChild: 'paterno',
        equalTo: filtro
      }
    });
  }

  updateFilter1(event) {
    let query = null;
    const val = event.target.value;
    console.log(val);
    if (val == "") {
      this.items = this.afoDatabase.list('/pacientes');
    }
    else {
      this.getFitro1(val);
    }
  }



  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  

  buscarPatPer(idPaciente: string) {
    this.personales = this.afoDatabase.list('/personales', {
      query: {
        orderByChild: 'paciente',
        equalTo: idPaciente
      }
    });
  }

  generarPersonales(idPaciente: string) {
    
    this.historialClinico=this.afoDatabase.list('/historialClinico');
    this.patoPersonales = this.afoDatabase.list('/patoPersonales', {
      query: {
        orderByChild: 'idPaciente',
        equalTo: idPaciente
      }
    });

    this.patoPersonales.forEach(item => {
      this.contador = item.length;
      console.log('dentro del foreach: ' + this.contador);
    });

    console.log(this.contador);
    if (this.contador != undefined) {
      this.sw=true;
      this.sw1=false;
      if (this.contador==0) {
        this.patoPersonales.push({
          idPaciente: idPaciente,
          preg1: false, preg2: false, preg3: false, preg4: false, preg5: false, preg6: false, preg7: false,
          preg8: false, preg9: false, preg10: false, preg11: false, preg12: false, preg13: false,
          preg14: false, preg15: false, preg16: false, preg17: false, preg18: false, preg19: false,
        }).then(this.notifierService.notify("Antecedentes Personales generados con éxito"));
        
        var fecha = new Date();
        var fechaActual=this.datePipe.transform(fecha,"yyyy-MM-dd HH:mm").toString();
        this.historialClinico.push({fecha:fechaActual, nro:idPaciente});

      } else {
        this.notifierService.notify("El paciente ya cuenta con su antecedente")
      }
    }
    else{
      this.notifierService.notify("Presione nuevamente para verificar estado de los antecedentes")
      this.contador=undefined;
    } 
  }

  generarFamiliares(idPaciente: string) {
    
    this.patoFamiliares = this.afoDatabase.list('/patoFamiliares', {
      query: {
        orderByChild: 'idPaciente',
        equalTo: idPaciente
      }
    });

    this.patoFamiliares.forEach(item => {
      this.contador = item.length;
      console.log('dentro del foreach: ' + this.contador);
    });

    console.log(this.contador);
    if (this.contador != undefined) {
      this.sw1=true;
      this.sw=false;
      if (this.contador==0) {
        this.patoFamiliares = this.afoDatabase.list('/patoFamiliares');
        this.patoFamiliares.push({
          idPaciente: idPaciente,
          preg1: false, preg2: false, preg3: false, preg4: false
        }).then(this.notifierService.notify("Antecedentes Familiares generados con éxito"));
      } else {
        this.notifierService.notify("El paciente ya cuenta con su antecedente")
      }
    }
    else{
      this.notifierService.notify("Presione nuevamente para verificar estado de los antecedentes")
    }
  }

 
}

