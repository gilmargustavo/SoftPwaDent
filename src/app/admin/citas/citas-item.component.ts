// angular
import { Component, Input } from '@angular/core';
import { Location,DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
// api
import { Tenant } from './../services/api/models';
import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

// providers/services
import { LocalStorageService, RestoreService, ValidationService } from './../controllers/services';
import { DataContext } from './../services/api/rest';
import { EntityService, ModalDialogService, BusyIndicatorService, NotifierService } from '../../core';


import {MdSnackBar, MdSnackBarConfig} from '@angular/material';

// components
import { BaseItemComponent } from './../controllers/components/base-item.component';

// other
import * as moment from 'moment';

@Component({
  selector: 'citasItem',
  templateUrl: './citas-item.component.html',
  styles:[`
  .borde{
    margin-top:10px;
  }
    `],
    providers: [DatePipe]
})

export class CitasItemComponent extends BaseItemComponent<Tenant> {

  citas: AfoListObservable<any>;
  items1: AfoListObservable<any[]>;
  doctores: AfoListObservable<any[]>;
  especialidad: AfoListObservable<any[]>;
  curacion: AfoListObservable<any[]>;
  pacientes: AfoListObservable<any[]>;
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
    protected restoreService: RestoreService<Tenant>,
    protected routeParams: ActivatedRoute,
    protected router: Router,
    protected validationService: ValidationService,
    protected afoDatabase: AngularFireOfflineDatabase
  ) {
    super(snackBar,datePipe,titleService,
      datacontextService.TenantApi,
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
    this.componentName = 'citas';
  }

  buildForm(): void {
    this.formMetaData = require('./citas.metaData.json');
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
      
      fecha: this.formMetaData.properties.fecha ? [
          this.formMetaData.properties.fecha['x-ncg'].defaultValue ? this.formMetaData.properties.fecha['x-ncg'].defaultValue : null,
          Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.fecha['x-ncg'].validations)
        )
      ] : null,
      
      hora: this.formMetaData.properties.hora ? [
          this.formMetaData.properties.hora['x-ncg'].defaultValue ? this.formMetaData.properties.hora['x-ncg'].defaultValue : null,
          Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.hora['x-ncg'].validations)
        )
      ] : null,
      
      especialidad: this.formMetaData.properties.especialidad ? [
        this.formMetaData.properties.especialidad['x-ncg'].defaultValue ? this.formMetaData.properties.especialidad['x-ncg'].defaultValue : null,
        Validators.compose(
        this.validationService.generateValidators(this.formMetaData.properties.especialidad['x-ncg'].validations)
      )
      ] : null,

      idDoctor: this.formMetaData.properties.idDoctor ? [
        this.formMetaData.properties.idDoctor['x-ncg'].defaultValue ? this.formMetaData.properties.idDoctor['x-ncg'].defaultValue : null,
        Validators.compose(
        this.validationService.generateValidators(this.formMetaData.properties.idDoctor['x-ncg'].validations)
      )
      ] : null,

      idPaciente: this.formMetaData.properties.idPaciente ? [
        this.formMetaData.properties.idPaciente['x-ncg'].defaultValue ? this.formMetaData.properties.idPaciente['x-ncg'].defaultValue : null,
        Validators.compose(
        this.validationService.generateValidators(this.formMetaData.properties.idPaciente['x-ncg'].validations)
      )
      ] : null,

      curacion: this.formMetaData.properties.curacion ? [
        this.formMetaData.properties.curacion['x-ncg'].defaultValue ? this.formMetaData.properties.curacion['x-ncg'].defaultValue : null,
        Validators.compose(
        this.validationService.generateValidators(this.formMetaData.properties.curacion['x-ncg'].validations)
      )
      ] : null,

      observacion: this.formMetaData.properties.observacion ? [
        this.formMetaData.properties.observacion['x-ncg'].defaultValue ? this.formMetaData.properties.observacion['x-ncg'].defaultValue : null,
        Validators.compose(
        this.validationService.generateValidators(this.formMetaData.properties.observacion['x-ncg'].validations)
      )
      ] : null,

    });
  }

  protected customValidate() {
  }

  protected populateComponentDataAsync() {
    this.pacientes=this.afoDatabase.list('/pacientes');
    this.doctores=this.afoDatabase.list('/doctores');
    this.especialidad=this.afoDatabase.list('/especialidad');
    this.curacion=this.afoDatabase.list('/curacion');
  }

  buscar(filtro: string){
    this.doctores=this.afoDatabase.list('/doctores',{
      query:{
        orderByChild:'especialidad',
        equalTo:filtro
      }
    });

    this.curacion=this.afoDatabase.list('/curacion',{
      query:{
        orderByChild:'especialidad',
        equalTo:filtro
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

  getFitro1(filtro: string) {
    this.doctores = this.afoDatabase.list('/doctores', {
      query: {
        orderByChild: 'ci',
        equalTo: filtro
      }
    });
  }

  updateFilter1(event) {
    let query = null;
    const val = event.target.value;
    console.log(val);
    if (val == "") {
      this.doctores = this.afoDatabase.list('/doctores');
    }
    else {
      this.getFitro1(val);
    }
  }


}
