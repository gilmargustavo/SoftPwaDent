
// angular
import { Component,Input,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// api
import { User } from './../services/api/models';


import { Upload } from '../services/api/interfaces/upload';
import { UploadService } from './../services/api/services/upload.service';

import { AfoListObservable, AngularFireOfflineDatabase ,AfoObjectObservable} from 'angularfire2-offline/database';

// components
import { BaseListComponent } from './../controllers/components';


// pipes
import { DisplayDataTransformPipe } from './../controllers/pipes';

// services
import { LocalStorageService, RestoreService } from './../controllers/services';
import { DataContext } from './../services/api/rest';
import { EntityService, ModalDialogService, BusyIndicatorService, NotifierService } from '../../core';

@Component({
  selector: 'userList',
  templateUrl: './user-list.component.html'
})

export class UserListComponent extends BaseListComponent<User>  {
  public tenantList: any = null;
  public keyName: string = 'id';
  public fieldFilterModel: any = null;
  public formMetaData: any = null;
  uploads: AfoListObservable<Upload[]>;
  showSpinner = true;

  items: AfoListObservable<any[]>;
  temp: AfoListObservable<any[]>;
  paciente: AfoObjectObservable<any>;

  
  constructor(protected afoDatabase:AngularFireOfflineDatabase, protected titleService: Title,
    protected entityService: EntityService, 
    protected modalDialogService: ModalDialogService, 
    protected busyIndicatorService: BusyIndicatorService, 
    protected notifierService: NotifierService,
    private datacontextService: DataContext,
    router: Router,
    activatedRoute: ActivatedRoute,
    private uploadService: UploadService
  ) {
    super(titleService, entityService, modalDialogService, busyIndicatorService, notifierService, datacontextService.UserApi, router, activatedRoute);

    this.formMetaData = require('./user.metaData.json'); 
    this.items = afoDatabase.list('/usuarios');
    this.componentName = 'UserListComponent';

    this.generateFilterModel();
  }

  ngOnInit() {
    this.uploads = this.uploadService.getUploads({limitToLast: 5})
    this.uploads.subscribe(() => this.showSpinner = false)
  console.log(this.uploads);
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
    this.populateTenantData();
  }
    
  // private methods populateTenantData
  private populateTenantData() {
   this.datacontextService.TenantApi
     .get()
     .subscribe((tenantlistWithCount) => {
        // TODO: this.tenantIsLoading = true;
        this.tenantList = tenantlistWithCount.list;
      },
      (error) => { this.errorMessage = <any>error; });
  }
  
}
