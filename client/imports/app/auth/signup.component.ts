import {Component, OnInit, NgZone} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Accounts } from 'meteor/accounts-base';
import {MeteorComponent} from 'angular2-meteor';
import {Observable, Subscription, Subject} from "rxjs";
import { Meteor } from 'meteor/meteor';
import { showAlert } from "../shared/show-alert";


import { DashboardComponent } from "../dashboard/dashboard.component";
import {LoginComponent} from "./login.component.web";

import template from './signup.component.html';

@Component({
  selector: 'signup',
  template
})
export class SignupComponent extends MeteorComponent implements OnInit {
  login = LoginComponent;
    
  signupForm: FormGroup;
  error: string;
  code: string;
  paramsSub: Subscription;
  patient: any[];
  //patientCode: String;

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
    this.code = this.navParams.get("code");
    this.call("patientsAccessCode", this.code, (err, patient) => {
        if (err) {                    
            showAlert("Error while fetching patient record.", "danger");
            return;
        }
        this.patient = patient;                
        this.zone.run(() => {
            if (patient) {
                this.signupForm.controls['firstName'].setValue(patient.firstName);
                this.signupForm.controls['lastName'].setValue(patient.lastName);
                this.signupForm.controls['email'].setValue(patient.email);
                this.signupForm.controls['accessCode'].setValue(patient.accessCode);
            }
        });
    });
        
    this.signupForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.pattern(emailRegex), Validators.required])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)]) ],
        firstName: ['', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z ]{2,30}")])],
        lastName: ['', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z ]{2,30}")])],
        accessCode:['', Validators.compose([Validators.minLength(6), Validators.required])],
    });

    this.error = '';
  }

  //-----------patient signup-------------//
  signup() {
    if (this.signupForm.valid) {
        var patientCode = this.signupForm.value.accessCode;
        var patientObj = {
            email: this.signupForm.value.email,
            password: this.signupForm.value.password,
            type: "patient",
            profile: {
                firstName: this.signupForm.value.firstName,
                lastName: this.signupForm.value.lastName
            }
        }
        
        this.call("insertPatient", patientObj, patientCode, (err, patient) => {
            if (err) {
                showAlert(err.reason, "danger");
                return;
            }
            if (patient) {
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