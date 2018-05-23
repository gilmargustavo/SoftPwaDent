// angular
import { Component, Input } from '@angular/core';
import { Location,DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

// api
import { NcgOther } from './../services/api/models';

// providers/services
import { LocalStorageService, RestoreService, ValidationService } from './../controllers/services';
import { DataContext } from './../services/api/rest';
import { EntityService, ModalDialogService, BusyIndicatorService, NotifierService } from '../../core';

import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
// components
import { BaseItemComponent } from './../controllers/components/base-item.component';
import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

// other
import * as moment from 'moment';

@Component({
  selector: 'odontograma',
  templateUrl: './odontograma-item.component.html',
  styles:[`
  .center{
    width: 75%;
  }
  
  .main-div{
    margin-top:40px;
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
  
  .tabla{
    width:100%;
    text-align:center;
  } 
  
  .linea{
    display:inline-block;
    margin:2px;
  }
  .borde{
    margin-top:10px;
  }
  `],
  providers:[DatePipe]
})

export class OdontogramaItemComponent extends BaseItemComponent<NcgOther> {
 
  pieza : string="";
  curacion : string="";
  normativa:string="NTS Nº-MINSA-DGSP-V O1";
  @Input() myForm: FormGroup;
  items: AfoListObservable<any[]>;
  items1: AfoListObservable<any[]>;
  normas: AfoListObservable<any[]>;
  curaciones: AfoListObservable<any[]>;
  superior: AfoListObservable<any[]>;
  inferior: AfoListObservable<any[]>;
  pacientes: AfoListObservable<any[]>;

  private input: any;

  constructor(protected snackBar: MdSnackBar,protected datePipe:DatePipe,
    protected datacontextService: DataContext,    
    protected titleService: Title,
    protected entityService: EntityService, 
    protected modalDialogService: ModalDialogService, 
    protected busyIndicatorService: BusyIndicatorService, 
    protected notifierService: NotifierService,
    protected formBuilder: FormBuilder,
    protected location: Location,
    protected restoreService: RestoreService<NcgOther>,
    protected routeParams: ActivatedRoute,
    protected router: Router,
    protected validationService: ValidationService,
    protected afoDatabase: AngularFireOfflineDatabase
  ) {
    super(snackBar,datePipe,titleService,
      datacontextService.NcgOtherApi,
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
    console.log(this.id);
    this.componentName='historial';
  }

  buildForm(): void {
    this.formMetaData = require('./odontograma.metaData.json');
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
      ] : null

    });
  }

  protected customValidate() {
  }

  protected populateComponentDataAsync() {
    this.items1 = this.afoDatabase.list('/especialidad');
    this.normas = this.afoDatabase.list('/norma');
    this.pacientes = this.afoDatabase.list('/pacientes');
    this.curaciones = this.afoDatabase.list('/norma/'+this.normativa);

    this.superior = this.afoDatabase.list('/odontograma/'+this.id+'/superior');
    this.inferior = this.afoDatabase.list('/odontograma/'+this.id+'/inferior');

    console.log( this.id);

  }

  buscar(filtro: string){
    this.curaciones=this.afoDatabase.list('/norma/'+this.normativa,{
      query:{
        orderByChild:'tipo',
        equalTo:filtro
      }
    });
  }

  cambiar(filtro: string){
    if(filtro==this.normativa)
      {this.normativa=filtro;
      this.curaciones = this.afoDatabase.list('/norma/'+ this.normativa);}
    else
    {
      this.normativa=filtro;
    this.curaciones = this.afoDatabase.list('/norma/'+this.normativa);
    }
  }

  mostrar(filtro: string){
    this.pieza=filtro;
    alert("El pieza a realizar es: " + this.pieza);
  }

  mostrar1(filtro: string){
    this.curacion=filtro;
    alert("El tratamiento a realizar es: " + filtro);
  }

  BuscarCambio(valor:string){
    
  }
}
