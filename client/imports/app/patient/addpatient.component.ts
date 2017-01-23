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
    patientId : string;
    practitionerId: string
    error: string;
    patient: any[];
   
    constructor(private navCtrl: NavController,
                private navParams: NavParams,
                private zone: NgZone,
                private formBuilder: FormBuilder )
            {
                super();
            }

    ngOnInit() {
        this.practitionerId = Meteor.userId();
        let emailRegex = "[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})";
        let phoneRegex = "[\s()+-]*([0-9][\s()+-]*){6,20}";
        
        this.patientId = this.navParams.get('patientId');
        //console.log(this.patientId,'patientid');
        if (this.patientId) {
            this.call("patientData",this.patientId, (err, patient) => {
                if (err) {                    
                    showAlert("Error while fetching patient record.", "danger");
                    return;
                }
                this.patient = patient;
                this.patientForm.controls['firstName'].setValue(patient.firstName);
                this.patientForm.controls['lastName'].setValue(patient.lastName);
                this.patientForm.controls['email'].setValue(patient.email);
                this.patientForm.controls['dob'].setValue(patient.dob);
                ////this.patientForm.controls['gender'].setValue(patient.gender);
                
                this.patientForm.controls['height'].setValue(patient.height);
                this.patientForm.controls['weight'].setValue(patient.weight);
                
                this.patientForm.controls['address'].setValue(patient.address);
                this.patientForm.controls['city'].setValue(patient.city);
                ////this.patientForm.controls['state'].setValue(patient.state);
                this.patientForm.controls['pincode'].setValue(patient.pincode);
                
                this.patientForm.controls['phonenumber'].setValue(patient.phonenumber);
                this.patientForm.controls['occupation'].setValue(patient.occupation);
                
            });
        }
        
            
        this.patientForm = this.formBuilder.group({
            firstName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern("[a-zA-Z]{2}[a-zA-Z ]*")])],
            lastName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern("[a-zA-Z][a-zA-Z ]*")])],
            dob: ['', Validators.compose([Validators.required])],
            email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex), Validators.minLength(5),Validators.maxLength(50)])],
            gender:['', Validators.required],
            height:['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(3), Validators.pattern("[1-9][0-9]{1,3}")])],
            weight:['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(3), Validators.pattern("[1-9][0-9]{1,3}")])],
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
            weight: this.patientForm.value.weight,
            occupation: this.patientForm.value.occupation,
            address: this.patientForm.value.address,
            addressLine: this.patientForm.value.addressLine,
            pincode: this.patientForm.value.pincode,
            city: this.patientForm.value.city,
            gender: this.patientForm.value.gender,
            practitioner: this.practitionerId
            
        }
        //console.log(patientObj,'patientObj', this.patientId);
        this.call("insertPatient", patientObj, this.patientId, (err, patient) => {
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