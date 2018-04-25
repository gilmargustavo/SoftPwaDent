// angular
import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

// api
import { AntPatPersonal } from './../services/api/models';
import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

// providers/services
import { LocalStorageService, RestoreService, ValidationService } from './../common/services';
import { DataContext } from './../services/api/rest';
import { EntityService, ModalDialogService, BusyIndicatorService, NotifierService } from '../../core';

// components
import { BaseItemComponent } from './../common/components/base-item.component';

// other
import * as moment from 'moment';

@Component({
  selector: 'antPatPersonal',
  templateUrl: './antPatPersonal-item.component.html'
})

export class AntPatPersonalItemComponent extends BaseItemComponent<AntPatPersonal> {


  @Input() myForm: FormGroup;

  constructor(
    protected datacontextService: DataContext,    
    protected titleService: Title,
    protected entityService: EntityService, 
    protected modalDialogService: ModalDialogService, 
    protected busyIndicatorService: BusyIndicatorService, 
    protected notifierService: NotifierService,
    protected formBuilder: FormBuilder,
    protected location: Location,
    protected restoreService: RestoreService<AntPatPersonal>,
    protected routeParams: ActivatedRoute,
    protected router: Router,
    protected validationService: ValidationService,
    protected afoDatabase: AngularFireOfflineDatabase
  ) {
    super(titleService,
      datacontextService.TypeOfTypeApi,
      entityService, 
      modalDialogService, 
      busyIndicatorService, 
      notifierService,
      formBuilder,
      location,
      restoreService,
      routeParams,
      router,
      validationService,
      afoDatabase
    );
    this.componentName = 'patoPersonales';
  }

  buildForm(): void {
    this.formMetaData = require('./antPatPersonal.metaData.json');
    this.normalizeFormMetaData();
    this.addFormValidation();

    this.myForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );

    this.onValueChanged(); // (re)set validation messages now
  }

  private addFormValidation() {
    this.myForm = this.formBuilder.group({

      
      presionAlta: this.formMetaData.properties.presionAlta ? [
          this.formMetaData.properties.presionAlta['x-ncg'].defaultValue ? this.formMetaData.properties.presionAlta['x-ncg'].defaultValue : null,
          Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.presionAlta['x-ncg'].validations)
        )
      ] : null,
      
    });
  }

  protected customValidate() {
  }

  protected populateComponentDataAsync() {
  }
}
