// angular
import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

// api
import { PacienteValidation } from './../services/api/models';

// providers/services
import { LocalStorageService, RestoreService, ValidationService } from './../common/services';
import { DataContext } from './../services/api/rest';
import { EntityService, ModalDialogService, BusyIndicatorService, NotifierService } from '../../core';

// components
import { BaseItemComponent } from './../common/components/base-item.component';

// other
import * as moment from 'moment';

import { AfoListObservable, AngularFireOfflineDatabase} from 'angularfire2-offline/database';
import { FirebaseApp } from 'angularfire2';


@Component({
  selector: 'paciente',
  templateUrl: './paciente-item.component.html'
})

export class PacienteItemComponent extends BaseItemComponent<PacienteValidation> {


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
    protected restoreService: RestoreService<PacienteValidation>,
    protected routeParams: ActivatedRoute,
    protected router: Router,
    protected validationService: ValidationService,
    protected afoDatabase: AngularFireOfflineDatabase
  ) {
    super(titleService,
      datacontextService.NcgValidationApi,
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
    this.componentName = 'pacientes';
  }

  buildForm(): void {
    this.formMetaData = require('./paciente.metaData.json');
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

      ci: this.formMetaData.properties.ci ? [
        this.formMetaData.properties.ci['x-ncg'].defaultValue ? this.formMetaData.properties.ci['x-ncg'].defaultValue : null,
        Validators.compose(
        this.validationService.generateValidators(this.formMetaData.properties.ci['x-ncg'].validations)
      )
    ] : null,

      
      nombre: this.formMetaData.properties.nombre ? [
          this.formMetaData.properties.nombre['x-ncg'].defaultValue ? this.formMetaData.properties.nombre['x-ncg'].defaultValue : null,
          Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.nombre['x-ncg'].validations)
        )
      ] : null,
      
      paterno: this.formMetaData.properties.paterno ? [
          this.formMetaData.properties.paterno['x-ncg'].defaultValue ? this.formMetaData.properties.paterno['x-ncg'].defaultValue : null,
          Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.paterno['x-ncg'].validations)
        )
      ] : null,
      
      materno: this.formMetaData.properties.materno ? [
          this.formMetaData.properties.materno['x-ncg'].defaultValue ? this.formMetaData.properties.materno['x-ncg'].defaultValue : null,
          Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.materno['x-ncg'].validations)
        )
      ] : null,
      
      celular: this.formMetaData.properties.celular ? [
          this.formMetaData.properties.celular['x-ncg'].defaultValue ? this.formMetaData.properties.celular['x-ncg'].defaultValue : null,
          Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.celular['x-ncg'].validations)
        )
      ] : null,
    });
  }

  protected customValidate() {
  }

  protected populateComponentDataAsync() {
  }
}
