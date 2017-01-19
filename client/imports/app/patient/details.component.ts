import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { Meteor } from 'meteor/meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';
import { InfiniteScroll } from 'angular2-infinite-scroll';

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
   
   
    practitionerId: String;
    patient: any[];
    skip:Number;
    limit:Number;
   
    constructor(private zone: NgZone,
                private navCtrl: NavController,
                private navParams: NavParams,)
            {
                super();                
            }

    ngOnInit() {
        this.practitionerId = Meteor.userId();
        this.skip = 0; this.limit = 5; this.searchText='';
        this.call("patientList",this.practitionerId, this.skip, this.limit, this.searchText, (err, patient) => {
            if (err) {                    
                showAlert("Error while fetching patient record.", "danger");
                return;
            }
            //console.log(patient,'patient');
            this.patient = patient; 
        });
      
    }
    
    editPatient(patientId){
        //console.log(patientId, 'editPatient');
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
        //console.log(event,'events');
        //console.log(this.searchText,'searchText');
        
        this.call("patientList",this.practitionerId, this.skip, this.limit, this.searchText, (err, patient) => {
            if (err) {                    
                showAlert("Error while fetching patient record.", "danger");
                return;
            }
            //console.log(this.patient,'patient', patient);
            this.patient = patient;
            
        });
        
    }
    
    onScrollDown () {
        //console.log('scrolled down!!');
        //console.log(this.searchText,'searchText');
        
        this.skip += 5;
        this.call("patientList",this.practitionerId, this.skip, this.limit, this.searchText, (err, patient) => {
            if (err) {                    
                showAlert("Error while fetching patient record.", "danger");
                return;
            }
            //console.log(this.patient,'patient', patient);
            let thisPatient = this.patient; 
            
            let newArray = thisPatient.concat(patient);
            //console.log(newArray,'patient');
            this.patient = newArray
            
        });
    }
 
    onScrollUp () {
    	//console.log('scrolled up!!')
    }

}