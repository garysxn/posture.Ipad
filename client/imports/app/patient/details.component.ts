import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { Meteor } from 'meteor/meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';
import { showAlert } from "../shared/show-alert";
import { PatientAddComponent } from "../patient/addpatient.component";
import { PatientDetailsComponent } from "../patient/view.component";
import template from './details.component.html';

@Component({
  selector: '',
  template
})
@InjectUser('user')
export class PatientListComponent extends MeteorComponent implements OnInit {
   addPatient = PatientAddComponent;
   viewPatient = PatientDetailsComponent;
   
   
   
   patient: any[];
   
    constructor(private zone: NgZone,
                private navCtrl: NavController,
                private navParams: NavParams,)
            {
                super();
                this.navParams = {id:'data'}
            }

    ngOnInit() {
      
        this.call("patientList",(err, patient) => {
            if (err) {                    
                showAlert("Error while fetching patient record.", "danger");
                return;
            }
            //console.log(patient,'patient');
            this.patient = patient;                
            //this.zone.run(() => {
            //    if (patient) {
            //        console.log(patient,'patient');                
            //    }
            //});
        });
      
    }
    
    editPatient(){
        console.log('editPatient');
        this.navParams = {id:'12dfas3'}
    }

}