import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import 'rxjs/add/operator/map'
import { map } from 'rxjs/operator/map';
import { SyncAsync } from '@angular/compiler/src/util';

@Injectable()
export class AuthenticationService {
    usuarios: AfoListObservable<any[]>;
    password: AfoListObservable<any[]>;
    constructor(private http: HttpClient, protected afoDatabase: AngularFireOfflineDatabase) { }

    public regiones: any = [];
    login(username: string, password: string) {

        console.log("usuario introducido es" + username);
        if (username != undefined && password != undefined) {

            this.afoDatabase.list('/usuarios', {
                query: {
                    orderByChild: 'usuario',
                    equalTo: username
                }
            }).subscribe(
                regiones => this.regiones = regiones,
                error => console.log(error),
            );

            localStorage.setItem("currentUser",JSON.stringify(this.regiones));
        }
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}