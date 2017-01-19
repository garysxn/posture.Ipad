import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeteorComponent } from 'angular2-meteor';
import { Observable, Subscription, Subject } from "rxjs";
import { InjectUser } from 'angular2-meteor-accounts-ui';
//import { Meteor } from 'meteor/meteor';
import { showAlert } from "../shared/show-alert";
import { PatientListComponent } from "./details.component";


import template from './addappointment.component.html';


@Component({
    selector: '',
    template
})
@InjectUser('user')
export class AppointmentComponent extends MeteorComponent implements OnInit {
   
    appointmentForm: FormGroup;
    patientId : string;
    practitionerId: string
    patient: any[];
    error:string;

    constructor(private navCtrl: NavController,
                private navParams: NavParams,
                private zone: NgZone,
                private formBuilder: FormBuilder )
            {
                super();
            }

    ngOnInit() {
        this.practitionerId = Meteor.userId();
        this.patientId = this.navParams.get('patientId');
        //console.log(this.patientId,'patientid');
        if (this.patientId) {
            this.call("patientData",this.patientId, (err, patient) => {
                if (err) {                    
                    showAlert("Error while fetching patient record.", "danger");
                    return;
                }
                //console.log(patient,'patient');
                this.patient = patient;
            });
        }
            
        this.appointmentForm = this.formBuilder.group({
            appointmenttime: ['', Validators.compose([Validators.required])],
            appointmentdate: ['', Validators.compose([Validators.required])],
            type: ['', Validators.compose([Validators.required])]
        });
    
        this.error = '';
    }

  /*-----------add patient appointments-------------*/
    addAppointment() {
        if (this.appointmentForm.valid) {
            var appointmentObj = {            
                appointmentTime: this.appointmentForm.value.appointmenttime,
                appointmentDate: this.appointmentForm.value.appointmentdate,
                type: this.appointmentForm.value.type,
                patient: this.patientId,
                practitioner: this.practitionerId
                
            }
            //console.log(patientObj,'patientObj', this.patientId);
            this.call("insertAppointment", appointmentObj, (err, patient) => {
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