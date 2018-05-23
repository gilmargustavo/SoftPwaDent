import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MdIconRegistry, MdDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuItems } from './../admin/admin.menu';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { MdSidenav } from "@angular/material";
import { AfoListObservable, AngularFireOfflineDatabase, AfoObjectObservable } from 'angularfire2-offline/database';

import { User } from '../_models/index';

@Component({
  templateUrl: './admin-layout.component.html',
  styles: [`:host {
  display: flex;
  flex: 1;
}

md-sidenav {
  width: 180px;
  background-color: rgb(71, 73, 75);
}
`]
})

export class AdminLayoutComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MdSidenav;
  isDarkTheme = false;
  habilitar = true;
  currentUser: User;
  pacientesCache: AfoListObservable<any[]>;
  historialesCache: AfoListObservable<any[]>;
  citasCache:AfoListObservable<any[]>;
  perCache:AfoListObservable<any[]>;
  famCache:AfoListObservable<any[]>;
  odontogramaCache:AfoListObservable<any[]>;
  normaCache:AfoListObservable<any[]>;
  especialidadCache:AfoListObservable<any[]>;
  doctoresCache:AfoListObservable<any[]>;
  constructor(protected afoDatabase: AngularFireOfflineDatabase,private router: Router, public menuItems: MenuItems, public translate: TranslateService,
    iconRegistry: MdIconRegistry, sanitizer: DomSanitizer, private dialog: MdDialog) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log( this.currentUser);
  }

  ngOnInit() {
    this.pacientesCache = this.afoDatabase.list('/pacientes');
    this.historialesCache = this.afoDatabase.list('/historial');
    this.citasCache = this.afoDatabase.list('/citas');
    this.perCache = this.afoDatabase.list('/patoPersonales');
    this.famCache = this.afoDatabase.list('/patoFamiliares');
    this.odontogramaCache = this.afoDatabase.list('/odontograma');
    this.normaCache = this.afoDatabase.list('/norma');
    this.especialidadCache = this.afoDatabase.list('/especialidad');
    this.doctoresCache = this.afoDatabase.list('/doctores');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 500) {
      this.sidenav.close();
    }
    if (event.target.innerWidth > 500) {
      this.sidenav.open();
    }
  }


  btnClick = function () {
    this.router.navigateByUrl('/admin/home');
  };

  btnClick1 = function () {
    this.router.navigateByUrl('/admin/paciente');
  };

  btnClick2 = function () {
    this.router.navigateByUrl('/admin/user');
  };

  btnClick3 = function () {
    this.router.navigateByUrl('/admin/antPatPersonal');
  };

  btnClick4 = function () {
    this.router.navigateByUrl('/admin/odontograma');
  };

  btnClick5 = function () {
    this.router.navigateByUrl('/admin/historial');
  };
  btnClick6 = function () {
    this.router.navigateByUrl('/admin/citas');
  };

  btnClick7 = function () {
    this.router.navigateByUrl('/admin/doctor');
  };

  btnClick8 = function () {
    this.router.navigateByUrl('/admin/login');
  };

  btnClick9 = function () {
    this.router.navigateByUrl('/admin/login/nuevo');
  };

  btnClick10 = function () {
    this.router.navigateByUrl('/admin/filiacion');
  };

  bloquear(){
    this.habilitar=true;
  }

}