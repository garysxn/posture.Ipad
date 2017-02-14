import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { Meteor } from 'meteor/meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';
import { InfiniteScroll } from 'angular2-infinite-scroll';

import { showAlert } from "../shared/show-alert";
import { PatientAddComponent } from "../patient/addpatient.component";
import { PatientDetailsComponent } from "../patient/view.component";
import { AppointmentComponent } from "../patient/addappointment.component";
import { PictureUploadComponent } from "./picture-upload.component";
import template from './details.component.html';

@Component({
  selector: '',
  template
})
@InjectUser('user')
export class PatientListComponent extends MeteorComponent implements OnInit {
    /* navPush variables */
    addPatient = PatientAddComponent;
    //viewPatient = PatientDetailsComponent;
   
    /* variables */
    practitionerId: string;
    patient: any[];
    skip:number;
    limit:number;
    searchText:string;
   
    constructor(private zone: NgZone,
                private navCtrl: NavController,
                private navParams: NavParams,)
            {
                super();                
            }
    
    /* ng init */
    ngOnInit() {
        this.practitionerId = Meteor.userId();
        this.skip = 0; this.limit = 5; this.searchText='';
        /* fetch all patient data */
        this.call("patientList",this.practitionerId, this.skip, this.limit, this.searchText, (err, patient) => {
            if (err) {                    
                showAlert("Error while fetching patient record.", "danger");
                return;
            }
            this.patient = patient; 
        });      
    }
    
    /* redirect to patient edit page */
    editPatient(patientId){
        this.navCtrl.push(PatientAddComponent, {
            patientId: patientId,
        });
    }
    
    /* redirect to patient appointment page */
    addAppointment(patientId){
        this.navCtrl.push(AppointmentComponent, {
            patientId: patientId,
        });
    }
    
    /* redirect to patient details page */
    viewPatient(patientId){
        this.navCtrl.push(PatientDetailsComponent, {
            patientId: patientId,
        });
    }

    /* upload picture for patient */
    uploadPicture(patientId) {
        this.navCtrl.push(PictureUploadComponent, {
            patientId: patientId,
        });
    }
    
    /* search patient on keypress */
    searchPatient(event){
        
        this.call("patientList",this.practitionerId, this.skip, this.limit, this.searchText, (err, patient) => {
            if (err) {                    
                showAlert("Error while fetching patient record.", "danger");
                return;
            }
            this.patient = patient;
        });        
    }
    
    /* infinite scroll down event */
    onScrollDown () {
        let count = 5;
        this.skip = this.skip+count;
        this.call("patientList",this.practitionerId, this.skip, this.limit, this.searchText, (err, patient) => {
            if (err) {                    
                showAlert("Error while fetching patient record.", "danger");
                return;
            }
            let thisPatient = this.patient; 
            let newArray = thisPatient.concat(patient);
            this.patient = newArray
        });
    }
    
    /* infinite scroll up event */
    onScrollUp () {
    	//console.log('scrolled up!!')
    }

}