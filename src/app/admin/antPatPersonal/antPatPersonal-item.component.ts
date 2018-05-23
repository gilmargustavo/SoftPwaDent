// angular
import { Component, Input } from '@angular/core';
import { Location,DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

// api
import { AntPatPersonal } from './../services/api/models';
import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
// providers/services
import { LocalStorageService, RestoreService, ValidationService } from './../controllers/services';
import { DataContext } from './../services/api/rest';
import { EntityService, ModalDialogService, BusyIndicatorService, NotifierService } from '../../core';

// components
import { BaseItemComponent } from './../controllers/components/base-item.component';

// other
import * as moment from 'moment';

@Component({
  selector: 'antPatPersonal',
  templateUrl: './antPatPersonal-item.component.html',
  styles:[`
  .borde{
    margin-top:10px;
  }

  .tab{
    border: 2px solid #5BBBFA;
    margin-left:3px;
    padding: 0.3em;
  }
    `],
  providers: [DatePipe]
})

export class AntPatPersonalItemComponent extends BaseItemComponent<AntPatPersonal> {


  @Input() myForm: FormGroup;

  constructor(protected snackBar: MdSnackBar,
    protected datePipe:DatePipe,
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
    super(snackBar,
      datePipe,titleService,
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


      preg1: this.formMetaData.properties.preg1 ? [
        this.formMetaData.properties.preg1['x-ncg'].defaultValue ? this.formMetaData.properties.preg1['x-ncg'].defaultValue : null,
        Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.preg1['x-ncg'].validations)
        )
      ] : null,
      preg2: this.formMetaData.properties.preg2 ? [
        this.formMetaData.properties.preg2['x-ncg'].defaultValue ? this.formMetaData.properties.preg2['x-ncg'].defaultValue : null,
        Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.preg2['x-ncg'].validations)
        )
      ] : null,
      preg3: this.formMetaData.properties.preg3 ? [
        this.formMetaData.properties.preg3['x-ncg'].defaultValue ? this.formMetaData.properties.preg3['x-ncg'].defaultValue : null,
        Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.preg3['x-ncg'].validations)
        )
      ] : null,
      preg4: this.formMetaData.properties.preg4 ? [
        this.formMetaData.properties.preg4['x-ncg'].defaultValue ? this.formMetaData.properties.preg4['x-ncg'].defaultValue : null,
        Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.preg4['x-ncg'].validations)
        )
      ] : null,
      preg5: this.formMetaData.properties.preg5 ? [
        this.formMetaData.properties.preg5['x-ncg'].defaultValue ? this.formMetaData.properties.preg5['x-ncg'].defaultValue : null,
        Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.preg5['x-ncg'].validations)
        )
      ] : null,
      preg6: this.formMetaData.properties.preg6 ? [
        this.formMetaData.properties.preg6['x-ncg'].defaultValue ? this.formMetaData.properties.preg6['x-ncg'].defaultValue : null,
        Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.preg6['x-ncg'].validations)
        )
      ] : null,
      preg7: this.formMetaData.properties.preg7 ? [
        this.formMetaData.properties.preg7['x-ncg'].defaultValue ? this.formMetaData.properties.preg7['x-ncg'].defaultValue : null,
        Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.preg7['x-ncg'].validations)
        )
      ] : null,
      preg8: this.formMetaData.properties.preg8 ? [
        this.formMetaData.properties.preg8['x-ncg'].defaultValue ? this.formMetaData.properties.preg8['x-ncg'].defaultValue : null,
        Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.preg8['x-ncg'].validations)
        )
      ] : null,
      preg9: this.formMetaData.properties.preg9 ? [
        this.formMetaData.properties.preg9['x-ncg'].defaultValue ? this.formMetaData.properties.preg9['x-ncg'].defaultValue : null,
        Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.preg9['x-ncg'].validations)
        )
      ] : null,
      preg10: this.formMetaData.properties.preg10 ? [
        this.formMetaData.properties.preg10['x-ncg'].defaultValue ? this.formMetaData.properties.preg10['x-ncg'].defaultValue : null,
        Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.preg10['x-ncg'].validations)
        )
      ] : null,
      preg11: this.formMetaData.properties.preg11 ? [
        this.formMetaData.properties.preg11['x-ncg'].defaultValue ? this.formMetaData.properties.preg11['x-ncg'].defaultValue : null,
        Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.preg11['x-ncg'].validations)
        )
      ] : null,
      preg12: this.formMetaData.properties.preg12 ? [
        this.formMetaData.properties.preg12['x-ncg'].defaultValue ? this.formMetaData.properties.preg12['x-ncg'].defaultValue : null,
        Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.preg12['x-ncg'].validations)
        )
      ] : null,
      preg13: this.formMetaData.properties.preg13 ? [
        this.formMetaData.properties.preg13['x-ncg'].defaultValue ? this.formMetaData.properties.preg13['x-ncg'].defaultValue : null,
        Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.preg13['x-ncg'].validations)
        )
      ] : null,
      preg14: this.formMetaData.properties.preg14 ? [
        this.formMetaData.properties.preg14['x-ncg'].defaultValue ? this.formMetaData.properties.preg24['x-ncg'].defaultValue : null,
        Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.preg14['x-ncg'].validations)
        )
      ] : null,
      preg15: this.formMetaData.properties.preg15 ? [
        this.formMetaData.properties.preg15['x-ncg'].defaultValue ? this.formMetaData.properties.preg15['x-ncg'].defaultValue : null,
        Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.preg15['x-ncg'].validations)
        )
      ] : null,
      preg16: this.formMetaData.properties.preg16 ? [
        this.formMetaData.properties.preg16['x-ncg'].defaultValue ? this.formMetaData.properties.preg16['x-ncg'].defaultValue : null,
        Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.preg16['x-ncg'].validations)
        )
      ] : null,
      preg17: this.formMetaData.properties.preg17 ? [
        this.formMetaData.properties.preg17['x-ncg'].defaultValue ? this.formMetaData.properties.preg17['x-ncg'].defaultValue : null,
        Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.preg17['x-ncg'].validations)
        )
      ] : null,
      preg18: this.formMetaData.properties.preg18 ? [
        this.formMetaData.properties.preg18['x-ncg'].defaultValue ? this.formMetaData.properties.preg18['x-ncg'].defaultValue : null,
        Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.preg18['x-ncg'].validations)
        )
      ] : null,
      preg19: this.formMetaData.properties.preg19 ? [
        this.formMetaData.properties.preg19['x-ncg'].defaultValue ? this.formMetaData.properties.preg19['x-ncg'].defaultValue : null,
        Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.preg19['x-ncg'].validations)
        )
      ] : null,

    });
  }

  protected customValidate() {
  }

  protected populateComponentDataAsync() {
  }
}
