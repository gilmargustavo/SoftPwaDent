// angular
import { Component, Input } from '@angular/core';
import { Location,DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

// api
import { NcgTypeAndFormat } from './../services/api/models';
import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

// providers/services
import { LocalStorageService, RestoreService, ValidationService } from './../controllers/services';
import { DataContext } from './../services/api/rest';
import { EntityService, ModalDialogService, BusyIndicatorService, NotifierService } from '../../core';

// components
import { BaseItemComponent } from './../controllers/components/base-item.component';

import {MdSnackBar, MdSnackBarConfig} from '@angular/material';

// other
import * as moment from 'moment';

@Component({
  selector: 'antPatFamiliarItem',
  templateUrl: './antPatFamiliar-item.component.html',
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

export class AntPatFamiliarItemComponent extends BaseItemComponent<NcgTypeAndFormat> {


  @Input() myForm: FormGroup;

  constructor(protected snackBar: MdSnackBar,
    protected datePipe: DatePipe,
    protected datacontextService: DataContext,
    protected titleService: Title,
    protected entityService: EntityService,
    protected modalDialogService: ModalDialogService,
    protected busyIndicatorService: BusyIndicatorService,
    protected notifierService: NotifierService,
    protected formBuilder: FormBuilder,
    protected location: Location,
    protected restoreService: RestoreService<NcgTypeAndFormat>,
    protected routeParams: ActivatedRoute,
    protected router: Router,
    protected validationService: ValidationService,
    protected afoDatabase: AngularFireOfflineDatabase
  ) {
    super(snackBar,
      datePipe,titleService,
      datacontextService.NcgTypeAndFormatApi,
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
    this.componentName = 'patoFamiliares';
  }

  buildForm(): void {
    this.formMetaData = require('./antPatFamiliar.metaData.json');
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

      id: this.formMetaData.properties.id ? [
        this.formMetaData.properties.id['x-ncg'].defaultValue ? this.formMetaData.properties.id['x-ncg'].defaultValue : null,
        Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.id['x-ncg'].validations)
        )
      ] : null,

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

    });
  }

  protected customValidate() {
  }

  protected populateComponentDataAsync() {
  }
}
