import {Component, OnInit, NgZone} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Accounts } from 'meteor/accounts-base';

import { DashboardComponent } from "../dashboard/dashboard.component";
import {LoginComponent} from "./login.component.web";

import template from './recover.component.html';

@Component({
  selector: 'recover',
  template
})
export class RecoverComponent implements OnInit {
  login = LoginComponent;

  recoverForm: FormGroup;
  error: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private zone: NgZone, private formBuilder: FormBuilder) {}

  ngOnInit() {
    var emailRegex = "[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})";
    this.recoverForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])]
    });

    this.error = '';
  }

  recover() {
    if (this.recoverForm.valid) {
      Accounts.forgotPassword({
        email: this.recoverForm.value.email
      }, (err) => {
        if (err) {
          this.zone.run(() => {
            this.error = err;
          });
        } else {
          this.navCtrl.push(DashboardComponent);
        }
      });
    }
  }
}