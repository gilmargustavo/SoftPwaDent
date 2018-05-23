
// angular
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// api
import { DefaultTypeAndFormat } from './../services/api/models';

// components
import { BaseListComponent } from './../controllers/components';

import { Upload } from '../services/api/interfaces/upload';
import { UploadService } from './../services/api/services/upload.service';
import * as _ from "lodash";

import { AuthService } from '../services/api/auth/auth.service';

// pipes
import { DisplayDataTransformPipe } from './../controllers/pipes';

// services
import { LocalStorageService, RestoreService } from './../controllers/services';
import { DataContext } from './../services/api/rest';
import { EntityService, ModalDialogService, BusyIndicatorService, NotifierService } from '../../core';

@Component({
  selector: 'loginList',
  templateUrl: './login-list.component.html'
})

export class LoginListComponent extends BaseListComponent<DefaultTypeAndFormat>  {

  email: string;
  password: string;
  public keyName: string = 'id';
  public fieldFilterModel: any = null;
  public formMetaData: any = null;
  selectedFiles: FileList;
  currentUpload: Upload;
  
  constructor(public authService: AuthService,protected titleService: Title,
    protected entityService: EntityService, 
    protected modalDialogService: ModalDialogService, 
    protected busyIndicatorService: BusyIndicatorService, 
    protected notifierService: NotifierService,
    private datacontextService: DataContext,
    router: Router,
    activatedRoute: ActivatedRoute,
    private uploadService: UploadService
  ) {
    super(titleService, entityService, modalDialogService, busyIndicatorService, notifierService, datacontextService.DefaultTypeAndFormatApi, router, activatedRoute);

    this.formMetaData = require('./login.metaData.json'); 
    this.componentName = 'LoginListComponent';

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

   detectFiles(event){
    this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.uploadService.pushUpload(this.currentUpload)
  }

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';    
  }

  logout() {
    this.authService.logout();
  }

}
