
// angular
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// api
import { NcgOther } from './../services/api/models';

// components
import { BaseListComponent } from './../controllers/components';

// pipes
import { DisplayDataTransformPipe } from './../controllers/pipes';


import { AfoListObservable, AngularFireOfflineDatabase ,AfoObjectObservable} from 'angularfire2-offline/database';

// services
import { LocalStorageService, RestoreService } from './../controllers/services';
import { DataContext } from './../services/api/rest';
import { EntityService, ModalDialogService, BusyIndicatorService, NotifierService } from '../../core';

@Component({
  selector: 'odontograma',
  templateUrl: './odontograma-list.component.html',
  styles:[`
  .center{
    width: 75%;
  }
  
  .main-div{
    margin-top:00px;
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
  }

  .borde{
    margin-top:10px;
  }
  
  `]
})

export class OdontogramaListComponent extends BaseListComponent<NcgOther>  {
  items: AfoListObservable<any[]>;
  superior: AfoListObservable<any[]>;
  inferior: AfoListObservable<any[]>;
  historialDiente: AfoListObservable<any[]>;
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
    super(titleService, entityService, modalDialogService, busyIndicatorService, notifierService, datacontextService.NcgOtherApi, router, activatedRoute);

    this.formMetaData = require('./odontograma.metaData.json'); 
    this.componentName = 'odontograma';
    this.items = afoDatabase.list('/pacientes');
    this.superior = afoDatabase.list('/superior');
    this.inferior = afoDatabase.list('/inferior');
    this.historialDiente = afoDatabase.list('/dd');
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

  protected buscarOdontograma(idPaciente: string) {

    this.superior = this.afoDatabase.list('/odontograma/'+idPaciente+"/superior");
    this.inferior = this.afoDatabase.list('/odontograma/'+idPaciente+"/inferior");
  }

  protected buscarHistorial(idPaciente: string){

  }
}
