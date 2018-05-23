import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AlertService, AuthenticationService } from '../_services/index';
import { NotifierService } from '../core';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    private vaciar: any;
    private vaciar1: any;
    public errorMsg = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        protected notifierService: NotifierService,
        private alertService: AlertService) {
            
         }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    }

    login(form: NgForm) {
        this.authenticationService.login(this.model.username, this.model.password)
        console.log("mi usuario=" + localStorage.getItem('currentUser'));
        if (localStorage.getItem('currentUser') == null) {
            form.resetForm();
            console.log("Contraseña incorrecta");
        }
        else {
            if (localStorage.getItem('currentUser') == "[]") {
                this.loading = false;
                form.resetForm();
                console.log("Contraseña incorrecta");
            }
            else {
                this.router.navigate([this.returnUrl]);
            }
        }
    }
}