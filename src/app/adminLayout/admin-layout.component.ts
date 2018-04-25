import { Component, OnInit,ViewChild ,HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MdIconRegistry, MdDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuItems } from './../admin/admin.menu';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { MdSidenav } from "@angular/material";

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

export class AdminLayoutComponent  implements OnInit{
  @ViewChild('sidenav') sidenav: MdSidenav;
  isDarkTheme = false;

  constructor(private router: Router, public menuItems: MenuItems, public translate: TranslateService,
    iconRegistry: MdIconRegistry, sanitizer: DomSanitizer, private dialog: MdDialog) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
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


  btnClick= function () {
    this.router.navigateByUrl('/admin/home');
  };

  btnClick1= function () {
    this.router.navigateByUrl('/admin/paciente');
  };

  btnClick2= function () {
    this.router.navigateByUrl('/admin/user');
  };

  btnClick3= function () {
    this.router.navigateByUrl('/admin/antPatPersonal');
  };
}