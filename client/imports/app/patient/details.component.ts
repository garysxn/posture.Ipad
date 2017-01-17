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
   //viewPatient = PatientDetailsComponent;
   
   
   practitionerId: string;
   patient: any[];
   
    constructor(private zone: NgZone,
                private navCtrl: NavController,
                private navParams: NavParams,)
            {
                super();                
            }

    ngOnInit() {
        this.practitionerId = Meteor.userId();
        this.call("patientList",this.practitionerId,(err, patient) => {
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
    
    editPatient(patientId){
        console.log(patientId, 'editPatient');
        this.navCtrl.push(PatientAddComponent, {
            patientId: patientId,
        });
    }
    
    viewPatient(patientId){
        //console.log(patientId, 'editPatient');
        this.navCtrl.push(PatientDetailsComponent, {
            patientId: patientId,
        });
    }
    
    eventHandler(event){
        console.log(event,'events');
        
    }

}