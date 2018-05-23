import { Injectable, style } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import * as Rx from 'rxjs';
import { IApi } from './IApi';
import { LocalQueryHelper } from './LocalQueryHelper';
import { AfoListObservable, AngularFireOfflineDatabase, AfoObjectObservable } from 'angularfire2-offline/database';

import {MdSnackBar, MdSnackBarConfig} from '@angular/material';

'use strict';

@Injectable()
export abstract class BaseApiLocal<T> implements IApi<T> {
  list: T[];
  keyName: string = 'fechaReg';
  datos: Rx.Observable<T>;
  datos1: AfoObjectObservable<any[]>;
  datos2: AfoListObservable<any[]>;

  citas: AfoListObservable<any[]>;
  diente: AfoListObservable<any[]>;

  public idGuardado: string = "";

  codigoUpdate: string = "";
  codigos: string[] = ['d10', 'd11', 'd12', 'd13', 'd14', 'd15', 'd16', 'd17', 'd18', 'd18', 'd20', 'd21', 'd22', 'd23', 'd24', 'd25'];
  dienteInferior: string[] = ['48', '31', '46', '45', '44', '43', '42', '41', '38', '32', '33', '34', '35', '36', '37', '47'];
  dienteSuperior: string[] = ['18', '21', '16', '15', '14', '13', '12', '11', '28', '22', '23', '24', '25', '26', '27', '17'];

  //registros para nuevo historial
  antPersonales: AfoListObservable<any[]>;
  antFamiliares: AfoListObservable<any[]>;
  odontogramaSup: AfoObjectObservable<any[]>;
  odontogramaInf: AfoObjectObservable<any[]>;
  historial: AfoListObservable<any[]>;

  modificaOdontograma: AfoListObservable<any[]>;

  cont: number = 0;
  dienteNumeral: String = "";

  modificaDiente: string = "";


  constructor(public LocalQueryHelper: LocalQueryHelper, public afoDatabase: AngularFireOfflineDatabase,public snackBar: MdSnackBar) {
    this.setListData();
  }

  abstract convertTo(list: any): T[];

  public get(expand?: string, filter?: string, select?: string, orderBy?: string, top?: number, skip?: number, count?: boolean,
    keywords?: string,
    extraHttpRequestParams?: any): Rx.Observable<{ count: number, list: T[] }> {
    console.log('orderBy: ' + orderBy);

    let source = Rx.Observable.create(

      (observer) => {

        let timer = setTimeout(() => {
          try {
            let listWithCount = {
              count: this.list.length,
              list: this.list
            };

            this.changeDateStringToDateObject(listWithCount.list);

            this.dataNormalization(listWithCount.list);

            // filter
            if (filter) {
              listWithCount.list = this.LocalQueryHelper.filter(listWithCount.list, filter);
              listWithCount.count = listWithCount.list.length;
            }

            if (keywords) {
              listWithCount.list = this.LocalQueryHelper.filterByKeywords(listWithCount.list, keywords);
              listWithCount.count = listWithCount.list.length;
            }

            // sort
            if (orderBy) {
              listWithCount.list = this.LocalQueryHelper.sort(listWithCount.list, orderBy);
            }

            // paging
            if (top || skip) {
              listWithCount.list = this.LocalQueryHelper.paging(listWithCount.list, top, skip);
            }

            // select
            if (select) {
              // UNDONE:
            }

            observer.next(listWithCount);
            observer.complete();
          } catch (error) {
            console.log(observer);

            observer.error(error);
          }
        }, 500);

        return () => {
          clearTimeout(timer);
        };
      });

    return source;
  }

  public getById(id: string, doc: string): Rx.Observable<T> {

    let source = Rx.Observable.create(
      (observer) => {

        let timer = setTimeout(() => {
          try {
            let itemToReturn = this.list.filter((item) => {
              return item[this.keyName] === id;
            })[0];
            observer.next(itemToReturn);
            observer.complete();
          } catch (error) {
            console.log(observer);
            observer.error(error);
          }
        }, 500);
        return () => {
          clearTimeout(timer);
        };

      });
    console.log(this.datos);
    console.log(source);
    this.datos = this.afoDatabase.object('/' + doc + '/' + id) as Rx.Observable<T>;
    return this.datos;
  }

  public getNewId() {
    return null; // this.list.length + 1;
  }

  private generateUniqueId(list): number {
    let listLength = Object.keys(list).length;
    let i = 1;

    while (i <= listLength) {
      if (this.checkIfUniqueId(list, i, this.keyName)) {
        return i;
      } else {
        i++;
      }
    }

    return ++listLength;
  }

  private checkIfUniqueId(list, id, idKeyName): boolean {
    let result = false;
    let invalid = 0;

    list.forEach((item) => {
      if (item[idKeyName] == id.toString()) {
        invalid++;
      }
    });

    result = invalid == 0 ? true : false;
    return result;
  }

  public post(item?: T, extraHttpRequestParams?: any): Rx.Observable<T> {
    console.log('BaseApiLocal post');
    let source = Rx.Observable.create(
      (observer) => {

        let timer = setTimeout(() => {
          try {
            item[this.keyName] = this.generateUniqueId(this.list);
            this.list.push(item);

            observer.next(item);
            observer.complete();
          } catch (error) {
            console.log(observer);
            observer.error(error);
          }
        }, 500);
        return () => {
          clearTimeout(timer);
        };
      });

    return source;
  }

  public delete(id: string, ifMatch?: string, extraHttpRequestParams?: any): Rx.Observable<{}> {
    console.log('BaseApiLocal delete');
    let source = Rx.Observable.create(
      (observer) => {
        let timer = setTimeout(() => {
          try {
            this.list = this.list.filter((item) => {
              return item[this.keyName] !== id;
            });

            observer.next(null);
            observer.complete();
          } catch (error) {
            console.log(observer);
            observer.error(error);
          }
        }, 500);
        return () => {
          clearTimeout(timer);
        };
      });

    return source;
  }

  public patch(id: number, item?: T, extraHttpRequestParams?: any): Rx.Observable<T> {
    console.log('BaseApiLocal patch');
    let source = Rx.Observable.create(
      (observer) => {

        let timer = setTimeout(() => {
          try {
            let itemToPatch = this.list.filter((item) => {

              return item[this.keyName] === id;
            })[0];

            this.extend(item, itemToPatch);

            observer.next(itemToPatch);
            observer.complete();
          } catch (error) {
            console.log(observer);

            observer.error(error);
          }
        }, 500);
        return () => {
          clearTimeout(timer);
        };

      });

    return source;
  }

  public save(id: string, item?: T, isEdited: boolean = true, doc?: string, extraHttpRequestParams?: any): Rx.Observable<T> {

    let config = new MdSnackBarConfig();
    config.duration = 5000;

    if (isEdited) {
      //console.log(doc, id);
      if (doc == 'pacientes') {
        if(item['materno']==undefined){
          item['materno']="";
        }
        if(item['celular']==undefined){
          item['celular']="";
        }

        this.datos2 = this.afoDatabase.list('/' + doc);
        this.datos2.update(id.toString(), item);
      }

      if (doc == 'citas') {
        this.citas = this.afoDatabase.list('/' + doc);
        this.citas.update(id.toString(), item);
      }

      if (doc == "patoPersonales") {
        this.antPersonales = this.afoDatabase.list('/patoPersonales');
        this.antPersonales.update(id.toString(), item);
      }

      if (doc == "patoFamiliares") {
        this.antFamiliares = this.afoDatabase.list('/patoFamiliares');
        const promise=this.antFamiliares.update(id.toString(), item);
        promise.then(() => this.snackBar.open('Antecedente Registrado', 'ONLINE' ,config));
        promise.offline.then(() => this.snackBar.open('Antecedente Registrado', 'OFFLINE' ,config));
      }


      if (doc == "historial") {
        this.historial = this.afoDatabase.list("/historial/" + id);
        this.historial.push({
          especialidad: item["especialidad"], norma: item["norma"], pieza: item["pieza"],
          curacion: item["curacion"]
        });

        for (this.cont = 0; this.dienteSuperior.length - 1; this.cont++) {
          if (this.dienteSuperior[this.cont] == item["pieza"]) {
            this.codigoUpdate = this.codigos[this.cont];
            this.modificaDiente = 'superior';
            this.dienteNumeral = this.dienteSuperior[this.cont];
            break;
          }
          if (this.dienteInferior[this.cont] == item["pieza"]) {
            this.codigoUpdate = this.codigos[this.cont];
            this.modificaDiente = 'inferior';
            this.dienteNumeral = this.dienteInferior[this.cont];
            break;
          }
        }
        //this.modificaOdontograma = this.afoDatabase.list('/odontograma/' + id + '/' + this.modificaDiente + '/' + this.codigoUpdate);
        //this.modificaOdontograma.set({ diente: item["curacion"], id: this.dienteNumeral });
      }

      if (doc == 'pacientes') {
        this.datos2 = this.afoDatabase.list('/' + doc);
        this.datos2.update(id.toString(), item);
      }
      //retorna un objeto
      return this.datos = this.afoDatabase.object('/' + doc) as Rx.Observable<T>;

    } else {
      console.log(item);
      if (doc == 'pacientes') {
        if(item['materno']==undefined){
          item['materno']="";
        }
        if(item['celular']==undefined){
          item['celular']="";
        }
        this.datos2 = this.afoDatabase.list('/' + doc);
        const promise=this.datos2.push(item);
        promise.then(() => this.snackBar.open('Paciente Registrado', 'ONLINE' ,config));
        promise.offline.then(() => this.snackBar.open('Paciente Registrado', 'OFFLINE' ,config));
      }

      if (doc == 'citas') {
        if(item['observacion']==undefined){
          item['observacion']="";
        }
        this.datos2 = this.afoDatabase.list('/' + doc);
        this.datos2.push(item);
      }

      if (doc == 'historial') {
        for (this.cont = 0; this.dienteSuperior.length - 1; this.cont++) {
          if (this.dienteSuperior[this.cont] == item["pieza"]) {
            this.codigoUpdate = this.codigos[this.cont];
            this.modificaDiente = 'superior';
            break;
          }
          if (this.dienteInferior[this.cont] == item["pieza"]) {
            this.codigoUpdate = this.codigos[this.cont];
            this.modificaDiente = 'inferior';
            break;
          }
        }
        
        this.datos2 = this.afoDatabase.list('/' + doc);
        this.datos2.push(item);

        this.modificaOdontograma = this.afoDatabase.list('/odontograma/' + item["paciente"] + '/' + this.modificaDiente);
        this.modificaOdontograma.update(this.codigoUpdate, { diente: item["imgcuracion"],estado: item["estado"]});
      }
      //this.datos1.push(item).then((item) => { console.log("el id es"+ item.key); }); obtiene el ultimo id registrado
      return this.datos = this.afoDatabase.object(doc) as Rx.Observable<T>;
    }
  }


  

  // HACK: for datetime input, improve to be more generic
  protected changeDateStringToDateObject(list) {
    list.forEach(item => {
      if (item.modifiedDate) {
        item.modifiedDate = new Date(item.modifiedDate);
      }
    });
  }

  protected dataNormalization(list) {
    list.forEach(item => {
      for (let key in item) {
        if (item.hasOwnProperty(key) && item[key] == undefined) {
          delete item[key];
        }
      }
    });
  }

  protected extend<T, U>(obj: T, extension: U) {
    Object.keys(obj).forEach((key) => {
      extension[key] = obj[key];
    });

    return extension as T & U;
  }

  protected setListData() {
  };
}

/* NinjaCodeGen.com by DNAfor.NET */
