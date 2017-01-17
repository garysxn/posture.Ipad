import { Component, OnInit, NgZone} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Accounts } from 'meteor/accounts-base';
import { MeteorComponent} from 'angular2-meteor';
import { Observable, Subscription, Subject} from "rxjs";
import { Meteor } from 'meteor/meteor';
import { showAlert } from "../shared/show-alert";


import { DashboardComponent } from "../dashboard/dashboard.component";
import { LoginComponent } from "./login.component.web";

import template from './signup.component.html';

@Component({
    selector: 'signup',
    template
})
export class SignupComponent extends MeteorComponent implements OnInit {
  //--navPush--//
  login = LoginComponent;
    
  //-----variables------//
  signupForm: FormGroup;
  error: string;
  //paramsSub: Subscription;
  

    constructor(
            private navCtrl: NavController,
            private navParams: NavParams,
            private zone: NgZone,
            private formBuilder: FormBuilder
        ){
            super();
        }
  
    ngOnInit() {
     
      var emailRegex = "[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})";
      this.signupForm = this.formBuilder.group({
          email: ['', Validators.compose([Validators.pattern(emailRegex), Validators.required, Validators.maxLength(60)])],
          password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(30)]) ],
          firstName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern("[a-zA-Z][a-zA-Z ]*")])],
          lastName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern("[a-zA-Z][a-zA-Z ]*")])],
          accessCode:['', Validators.compose([Validators.minLength(6), Validators.required])],
      });
      
      //this.error = '';
    }

  //-----------practitioner signup-------------//
  signup() {
        //console.log(this.signupForm.valid,'this.signupForm.valid',this.error);
        if (this.signupForm.valid) {
            var practitionerCode = this.signupForm.value.accessCode;
            var practitionerObj = {
                email: this.signupForm.value.email,
                password: this.signupForm.value.password,
                //type: "practitioner",
                code: practitionerCode,
                profile: {
                    firstName: this.signupForm.value.firstName,
                    lastName: this.signupForm.value.lastName
                }
            }
            
            this.call("insertPractitioner", practitionerObj, practitionerCode, (err, practitioner) => {
                //console.log(err,'sdfs',practitioner);
                if (err) {
                    showAlert(err.reason, "danger");
                    return;
                }
                if (practitioner) {
                    Meteor.loginWithPassword(this.signupForm.value.email, this.signupForm.value.password, (err) => {
                        if (err) {
                            this.zone.run(() => {
                              this.error = err;
                            });
                        } else {
                            this.navCtrl.setRoot(DashboardComponent);
                        }
                    });
                }
            });
            
        }
    }
    
}