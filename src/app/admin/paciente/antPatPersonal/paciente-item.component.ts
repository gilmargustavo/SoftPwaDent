// angular
import { Component, Input } from '@angular/core';
import { Location,DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

// api
import { PacienteValidation } from '.././../services/api/models';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
// providers/services
import { LocalStorageService, RestoreService, ValidationService } from '.././../controllers/services';
import { DataContext } from '../../services/api/rest';
import { EntityService, ModalDialogService, BusyIndicatorService, NotifierService } from '../../../core';

// components
import { BaseItemComponent } from '../../controllers/components/base-item.component';

// other
import * as moment from 'moment';

import { AfoListObservable, AngularFireOfflineDatabase} from 'angularfire2-offline/database';
import { FirebaseApp } from 'angularfire2';


@Component({
  selector: 'antPatPersonalItem',
  templateUrl: './paciente-item.component.html',
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
  }`]
})

export class AntItemComponent extends BaseItemComponent<PacienteValidation> {


  @Input() myForm: FormGroup;
  superior: AfoListObservable<any[]>;
  inferior: AfoListObservable<any[]>;
  ide:string="";
  constructor(protected snackBar: MdSnackBar,protected datePipe:DatePipe,
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
    super(snackBar,datePipe,titleService,
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
    this.componentName = 'historial';
  }

  buildForm(): void {
    this.formMetaData = require('../paciente.metaData.json');
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

      fechaNac: this.formMetaData.properties.fechaNac ? [
        this.formMetaData.properties.fechaNac['x-ncg'].defaultValue ?
          this.formMetaData.properties.fechaNac['x-ncg'].defaultValue : null,
        Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.fechaNac['x-ncg'].validations)
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
    this.id=this.activatedRoute.snapshot.params['$key'];
    console.log(this.id);
    this.items = this.afoDatabase.list('/historial/'+this.id);
    this.superior = this.afoDatabase.list('/odontograma/'+this.id+'/superior');
    this.inferior = this.afoDatabase.list('/odontograma/'+this.id+'/inferior');

   // this.items = this.afoDatabase.list('/citas/'+this.id);
  }

  public irOdontograma(item) {
    this.ide = item.$key;
    this.router.navigate(['../../../odontograma', this.ide], { relativeTo: this.activatedRoute });
  }
}
