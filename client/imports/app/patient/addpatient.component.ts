import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeteorComponent } from 'angular2-meteor';
import { Observable, Subscription, Subject } from "rxjs";
import { InjectUser } from 'angular2-meteor-accounts-ui';
//import { Meteor } from 'meteor/meteor';
import { showAlert } from "../shared/show-alert";
import { PatientListComponent } from "./details.component";


import template from './addpatient.component.html';


@Component({
  selector: 'addpatient',
  template
})
@InjectUser('user')
export class PatientAddComponent extends MeteorComponent implements OnInit {
   
   patientForm: FormGroup;
  //error: string;
  //code: string;
  //paramsSub: Subscription;
  //patient: any[];
  //patientCode: String;

  constructor(
      private navCtrl: NavController,
      private navParams: NavParams,
      private zone: NgZone,
      private formBuilder: FormBuilder
    ){
        super();
        let abc = this.navParams.get('id');
        console.log(abc,'abc');
    }

  ngOnInit() {
    let emailRegex = "[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})";
    let phoneRegex = "[\s()+-]*([0-9][\s()+-]*){6,20}";
    
    //this.call("patientList",(err, patient) => {
    //    if (err) {                    
    //        showAlert("Error while fetching patient record.", "danger");
    //        return;
    //    }
    //    this.patient = patient;                
    //    this.zone.run(() => {
    //        if (patient) {
    //            console.log(patient,'patient');                
    //        }
    //    });
    //});
        
    this.patientForm = this.formBuilder.group({
        firstName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern("[a-zA-Z]{2}[a-zA-Z ]*")])],
        lastName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern("[a-zA-Z][a-zA-Z ]*")])],
        dob: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex), Validators.minLength(5),Validators.maxLength(50)])],
        gender:[''],
        height:['', Validators.compose([Validators.required, Validators.pattern("[1-9][0-9]{1,3}")])],
        weight:['', Validators.compose([Validators.required, Validators.pattern("[1-9][0-9]{1,3}")])],
        address:['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
        pincode:['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(7)])],
        city:['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern("[a-zA-Z]{2}[a-zA-Z ]*")])],
        phonenumber:['', Validators.compose([Validators.required, Validators.pattern(phoneRegex)]) ],
        occupation: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern("[a-zA-Z]{2}[a-zA-Z ]*")])],
    });

    this.error = '';
  }

  //-----------patient add-------------//
  addPatient() {
    if (this.patientForm.valid) {
        var patientObj = {            
            firstName: this.patientForm.value.firstName,
            lastName: this.patientForm.value.lastName,
            email: this.patientForm.value.email,
            phonenumber: this.patientForm.value.phonenumber,
            dob: this.patientForm.value.dob,
            height: this.patientForm.value.height,
            weitht: this.patientForm.value.weight,
            occupation: this.patientForm.value.occupation,
            address: this.patientForm.value.address,
            addressLine: this.patientForm.value.addressLine,
            pincode: this.patientForm.value.pincode,
            city: this.patientForm.value.city,
            gender: this.patientForm.value.gender, 
            
        }
        //console.log(patientObj,'patientObj');
        this.call("insertPatient", patientObj, (err, patient) => {
            if (err) {
                showAlert(err.reason, "danger");
                return;
            }
            if (patient) {                
                //console.log(patient,'insert patients');
                this.navCtrl.setRoot(PatientListComponent);                
            }
        });
        
    }
  }

}