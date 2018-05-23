// angular
import { Component, Input,ViewChild } from '@angular/core';
import { Location,DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MdSidenav } from "@angular/material";

import {MdSnackBar, MdSnackBarConfig} from '@angular/material';

// api
import { DefaultValidation } from './../services/api/models';

// providers/services
import { LocalStorageService, RestoreService, ValidationService } from './../controllers/services';
import { DataContext } from './../services/api/rest';
import { EntityService, ModalDialogService, BusyIndicatorService, NotifierService } from '../../core';

// components
import { BaseItemComponent } from './../controllers/components/base-item.component';

// other
import * as moment from 'moment';
import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

@Component({
  selector: 'historialItem',
  templateUrl: './historial-item.component.html',
  styleUrls: ['historial.css'],
  providers:[DatePipe]
})

export class HistorialItemComponent extends BaseItemComponent<DefaultValidation> {
  @ViewChild('sidenav') sidenav: MdSidenav;
  item: DefaultValidation = new DefaultValidation();
  pieza : string="";
  curacion : string="";
  normativa:string="NTS Nº-MINSA-DGSP-V O1";
  @Input() myForm: FormGroup;
  items: AfoListObservable<any[]>;
  items1: AfoListObservable<any[]>;
  normas: AfoListObservable<any[]>;
  norma1: AfoListObservable<any[]>;
  norma2: AfoListObservable<any[]>;
  superior: AfoListObservable<any[]>;
  inferior: AfoListObservable<any[]>;
  pacientes: AfoListObservable<any[]>;  
  tab=false;
  tab1=true;
  private inputCuracion: any;
  private inputpieza: any;
  private inputimg: any;

  message: string = '';
  actionButtonLabel: string = '';
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 7000;
  addExtraClass: boolean = false;
  

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
    protected restoreService: RestoreService<DefaultValidation>,
    protected routeParams: ActivatedRoute,
    protected router: Router,
    protected validationService: ValidationService,
    protected afoDatabase: AngularFireOfflineDatabase
  ) {
    super(snackBar, 
      datePipe,
      titleService,
      datacontextService.DefaultValidationApi,
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
    
    this.componentName="historial"
  }

  buildForm(): void {
    this.formMetaData = require('./historial.metaData.json');
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

      norma: this.formMetaData.properties.norma ? [
        this.formMetaData.properties.norma['x-ncg'].defaultValue ? this.formMetaData.properties.norma['x-ncg'].defaultValue : null,
        Validators.compose(
        this.validationService.generateValidators(this.formMetaData.properties.norma['x-ncg'].validations)
      )
      ] : null,

      especialidad: this.formMetaData.properties.especialidad ? [
        this.formMetaData.properties.especialidad['x-ncg'].defaultValue ? this.formMetaData.properties.especialidad['x-ncg'].defaultValue : null,
        Validators.compose(
        this.validationService.generateValidators(this.formMetaData.properties.especialidad['x-ncg'].validations)
      )
      ] : null,

      pieza: this.formMetaData.properties.pieza ? [
        this.formMetaData.properties.pieza['x-ncg'].defaultValue ? this.formMetaData.properties.pieza['x-ncg'].defaultValue : null,
        Validators.compose(
        this.validationService.generateValidators(this.formMetaData.properties.pieza['x-ncg'].validations)
      )
      ] : null,

      curacion: this.formMetaData.properties.curacion ? [
        this.formMetaData.properties.curacion['x-ncg'].defaultValue ? this.formMetaData.properties.curacion['x-ncg'].defaultValue : null,
        Validators.compose(
        this.validationService.generateValidators(this.formMetaData.properties.curacion['x-ncg'].validations)
      )
      ] : null,

      paciente: this.formMetaData.properties.paciente ? [
        this.formMetaData.properties.paciente['x-ncg'].defaultValue ? this.formMetaData.properties.paciente['x-ncg'].defaultValue : null,
        Validators.compose(
        this.validationService.generateValidators(this.formMetaData.properties.paciente['x-ncg'].validations)
      )
      ] : null,

      imgcuracion: this.formMetaData.properties.imgcuracion ? [
        this.formMetaData.properties.imgcuracion['x-ncg'].defaultValue ? this.formMetaData.properties.imgcuracion['x-ncg'].defaultValue : null,
        Validators.compose(
        this.validationService.generateValidators(this.formMetaData.properties.imgcuracion['x-ncg'].validations)
      )
      ] : null,

      estado: this.formMetaData.properties.estado ? [
        this.formMetaData.properties.estado['x-ncg'].defaultValue ? this.formMetaData.properties.estado['x-ncg'].defaultValue : null,
        Validators.compose(
        this.validationService.generateValidators(this.formMetaData.properties.estado['x-ncg'].validations)
      )
      ] : null

    });
  }

  protected customValidate() {
  }




  protected populateComponentDataAsync() {
    this.items1 = this.afoDatabase.list('/especialidad');
    this.normas = this.afoDatabase.list('/norma');
    this.norma1 = this.afoDatabase.list('/norma/NTS Nº-MINSA-DGSP-V O1');
    this.norma2 = this.afoDatabase.list('/norma/UNAH-VS');
    this.pacientes = this.afoDatabase.list('/pacientes');

    //this.id=this.activatedRoute.snapshot.params['$key'];
    console.log("el codigo activo es de : "+ this.activado);
    this.superior = this.afoDatabase.list('/superior');
    this.inferior = this.afoDatabase.list('/inferior');

    console.log( this.id);

  }

  buscar(filtro: string){
    this.norma1=this.afoDatabase.list('/norma/NTS Nº-MINSA-DGSP-V O1',{
      query:{
        orderByChild:'tipo',
        equalTo:filtro
      }
    });

    this.norma2=this.afoDatabase.list('/norma/UNAH-VS',{
      query:{
        orderByChild:'tipo',
        equalTo:filtro
      }
    });
  }

  cambiar(filtro: string){
    if(filtro==this.normativa)
      {
        console.log("dsdsd");this.tab=false;this.tab1=true;}
    else
    {
      {this.tab1=false;this.tab=true;}
    }
  }

  mostrar(filtro: string,superior:string){
    let config = new MdSnackBarConfig();
    this.message= superior + ' | '+ filtro
    config.duration = this.autoHide;
    this.actionButtonLabel="PIEZA"
    this.snackBar.open(this.message, this.actionButtonLabel, config);
    this.item.pieza=filtro
  }

  mostrar1(filtro: string,filtro1:string,filtro2:string ){
    let config = new MdSnackBarConfig();
    this.message=filtro
    config.duration = this.autoHide;
    this.actionButtonLabel="CURACIÓN"
    this.snackBar.open(this.message, this.actionButtonLabel, config);
    this.item.curacion=filtro
    this.item.imgcuracion=filtro1;
    this.item.estado=filtro2;
  }

  BuscarCambio(valor:string){
    
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
}



