import { Component, OnInit, NgZone } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { NavController, NavParams } from 'ionic-angular';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';
import { showAlert } from "../shared/show-alert";
import template from './view.component.html';

@Component({
  selector: '',
  template
})
@InjectUser('user')
export class PatientDetailsComponent extends MeteorComponent implements OnInit {
   
   patientData: any[];
   appointmentData: any[];
   
    constructor(private navCtrl: NavController,
                private navParams: NavParams,
                private zone: NgZone )
            {
                super();
            }

    ngOnInit() {
        let patientId = this.navParams.get('patientId');
        
        this.call("patientData",patientId, (err, patient) => {
            if (err) {                    
                showAlert("Error while fetching patient record.", "danger");
                return;
            }
            this.patientData = patient;  
        });
        
        this.call("appointmentData",patientId, (err, result) => {
            if (err) {                    
                showAlert("Error while fetching patient record.", "danger");
                return;
            }
            //console.log(result);
            this.appointmentData = result;  
        });
    }

}