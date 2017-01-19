import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';
import { Meteor } from "meteor/meteor";

import { ProviderService } from "../../services/provider.service";
import { LandingComponent } from "../layout/landing.component";
import { PatientListComponent } from "../patient/details.component";
import { PostureComponent } from "../analysis/posture.component";
import { PractitionerDetailsComponent } from "../practitioner/details.component";

import template from "./dashboard.html";

@Component({
    selector: "dashboard",
    template
})

export class DashboardComponent implements OnInit {

    profile = PractitionerDetailsComponent;
    analysis = PostureComponent;
    patientDetails = PatientListComponent;

    constructor(private navCtrl: NavController, private navParams: NavParams, private providerService: ProviderService) {
        //$('.collapsible').collapsible();

        if(! Meteor.userId()){
            this.navCtrl.setRoot(LandingComponent);
        }
    }

    ngOnInit() {
        if (Meteor.userId()) {
            this.providerService.fetchData();
        }
    }
}