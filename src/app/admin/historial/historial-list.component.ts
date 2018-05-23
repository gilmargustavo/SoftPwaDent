
// angular
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// api
import { DefaultValidation } from './../services/api/models';

// components
import { BaseListComponent } from './../controllers/components';

// pipes
import { DisplayDataTransformPipe } from './../controllers/pipes';

// services
import { LocalStorageService, RestoreService } from './../controllers/services';
import { DataContext } from './../services/api/rest';
import { EntityService, ModalDialogService, BusyIndicatorService, NotifierService } from '../../core';
import { HistorialItemComponent } from './historial-item.component';

import { AfoListObservable, AngularFireOfflineDatabase, AfoObjectObservable } from 'angularfire2-offline/database';

@Component({
  selector: 'historialList',
  templateUrl: './historial-list.component.html',
  styles: [`
  .center{
    width: 75%;
  }
  
  .main-div{
    margin-top:0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .md-card-image{
    border: 1px dashed #33BEFF;       
  }

  .md-card-image:hover{
    transform : scale(1.1);
    -moz-transform : scale(1.1);    
    -webkit-transform : scale(1.1);   
    -o-transform : scale(1.1);        
  }
  

  
  .linea{
    display:inline-block;
    margin:2px;
  }`]
})

export class HistorialListComponent extends BaseListComponent<DefaultValidation>  {
  items: AfoListObservable<any[]>;
  historiales: AfoListObservable<any[]>;
  temp: AfoListObservable<any[]>;
  paciente: AfoObjectObservable<any>;
  dientes: AfoObjectObservable<any[]>;
  public keyName: string = 'id';
  public fieldFilterModel: any = null;
  public formMetaData: any = null;
  public his: HistorialItemComponent;
  superior: AfoListObservable<any[]>;
  inferior: AfoListObservable<any[]>;
  dientesPacienteInf: AfoListObservable<any[]>;
  dientesPacienteSup: AfoListObservable<any[]>;
  odontogramas: AfoListObservable<any[]>;

  tab1 = true;
  contador: number;

  constructor(protected afoDatabase: AngularFireOfflineDatabase, protected titleService: Title,
    protected entityService: EntityService,
    protected modalDialogService: ModalDialogService,
    protected busyIndicatorService: BusyIndicatorService,
    protected notifierService: NotifierService,
    private datacontextService: DataContext,
    router: Router,
    activatedRoute: ActivatedRoute,
  ) {
    super(titleService, entityService, modalDialogService, busyIndicatorService, notifierService, datacontextService.DefaultValidationApi, router, activatedRoute);

    this.formMetaData = require('./historial.metaData.json');
    this.componentName = 'historial';
    //this.items = afoDatabase.list('/pacientes');

    //this.id = activatedRoute.snapshot.params['$key'];
    this.items = this.afoDatabase.list('/pacientes');
    this.historiales = this.afoDatabase.list('/historial');
    //this.superior = this.afoDatabase.list('/odontograma/' + this.id + '/superior');
    //this.inferior = this.afoDatabase.list('/odontograma/' + this.id + '/inferior');


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

  protected verificaHistorial(idPaciente: string) {
    this.historiales = this.afoDatabase.list('/historial', {
      query: {
        orderByChild: 'paciente',
        equalTo: idPaciente
      }
    });
    this.tab1 = false;

    this.verOdontograma(idPaciente);
  }
  public onSort(event) {
    this.updateSort(event.sorts[0].prop);
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


  public numPagesUpdated(event) { }

  protected populateComponentDataAsync() {
  }

  protected verOdontograma(idPaciente: string) {
    this.dientesPacienteSup = this.afoDatabase.list('/odontograma/' + idPaciente + '/superior');
    this.dientesPacienteInf = this.afoDatabase.list('/odontograma/' + idPaciente + '/inferior');

    console.log(this.dientesPacienteInf);
  }

  protected generarOdontograma(idPaciente: string) {

    this.odontogramas = this.afoDatabase.list('/historial', {
      query: {
        orderByChild: 'paciente',
        equalTo: idPaciente
      }
    });

    this.odontogramas.forEach(item => {
      this.contador = item.length;
      console.log('dentro del foreach: ' + this.contador);
    });

    console.log(this.contador);
    if (this.contador != undefined) {
      if (this.contador == 0) {
        this.dientes = this.afoDatabase.object('/odontograma/' + idPaciente);
        this.dientes.update({
          superior: {
            d10: { "diente": "18", "id": "18","estado":"indefinido" },
            d11: { "diente": "21", "id": "21" ,"estado":"indefinido" },
            d12: { "diente": "16", "id": "16" ,"estado":"indefinido" },
            d13: { "diente": "15", "id": "15" ,"estado":"indefinido" },
            d14: { "diente": "14", "id": "14" ,"estado":"indefinido" },
            d15: { "diente": "13", "id": "13" ,"estado":"indefinido" },
            d16: { "diente": "12", "id": "12" ,"estado":"indefinido" },
            d17: { "diente": "11", "id": "11" ,"estado":"indefinido" },
            d18: { "diente": "28", "id": "28" ,"estado":"indefinido" },
            d19: { "diente": "22", "id": "22" ,"estado":"indefinido" },
            d20: { "diente": "23", "id": "23" ,"estado":"indefinido" },
            d21: { "diente": "24", "id": "24" ,"estado":"indefinido" },
            d22: { "diente": "25", "id": "25" ,"estado":"indefinido" },
            d23: { "diente": "26", "id": "26" ,"estado":"indefinido" },
            d24: { "diente": "27", "id": "27" ,"estado":"indefinido" },
            d25: { "diente": "17", "id": "17" ,"estado":"indefinido" }
          }, inferior: {
            d10: { "diente": "48", "id": "48" ,"estado":"indefinido" },
            d11: { "diente": "31", "id": "31" ,"estado":"indefinido" },
            d12: { "diente": "46", "id": "46" ,"estado":"indefinido" },
            d13: { "diente": "45", "id": "45" ,"estado":"indefinido" },
            d14: { "diente": "44", "id": "44" ,"estado":"indefinido" },
            d15: { "diente": "43", "id": "43" ,"estado":"indefinido" },
            d16: { "diente": "42", "id": "42" ,"estado":"indefinido" },
            d17: { "diente": "41", "id": "41" ,"estado":"indefinido" },
            d18: { "diente": "38", "id": "38" ,"estado":"indefinido" },
            d19: { "diente": "32", "id": "32" ,"estado":"indefinido" },
            d20: { "diente": "33", "id": "33" ,"estado":"indefinido" },
            d21: { "diente": "34", "id": "34" ,"estado":"indefinido" },
            d22: { "diente": "35", "id": "35" ,"estado":"indefinido" },
            d23: { "diente": "36", "id": "36" ,"estado":"indefinido" },
            d24: { "diente": "37", "id": "37" ,"estado":"indefinido" },
            d25: { "diente": "47", "id": "47" ,"estado":"indefinido" }
          }
        }).then(this.notifierService.notify("Odontograma generado con exito"));


      } else {
        this.notifierService.notify("El paciente ya tiene curaciones registradas")
      }
    }
    else {
      this.notifierService.notify("Presione nuevamente para verificar estado del odontograma")
    }
  }
}
