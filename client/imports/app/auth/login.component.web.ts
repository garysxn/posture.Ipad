import {Component, OnInit, NgZone} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { SignupComponent } from "./signup.component";
import { RecoverComponent } from "./recover.component";
import { DashboardComponent } from "../dashboard/dashboard.component";

import template from './login.component.web.html';

@Component({
  selector: 'login',
  template
})
export class LoginComponent implements OnInit {
    //-----navPush-----//
    signup = SignupComponent;
    recover = RecoverComponent;

    loginForm: FormGroup;
    error: string;
  
    constructor(private navCtrl: NavController,
                private navParams: NavParams,
                private zone: NgZone,
                private formBuilder: FormBuilder)
            {}
  
    ngOnInit() {
        var emailRegex = "[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})";
        this.loginForm = this.formBuilder.group({
          email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
          password: ['', Validators.required]
        });
        this.error = '';
    }

    login() {
        if (this.loginForm.valid) {
            
            Meteor.loginWithPassword(this.loginForm.value.email, this.loginForm.value.password, (err) => {
                if (err) {
                    this.zone.run(() => {
                      this.error = err;
                    });
                } else {
                    this.navCtrl.setRoot(DashboardComponent);
                }
            });
        }
    }
}