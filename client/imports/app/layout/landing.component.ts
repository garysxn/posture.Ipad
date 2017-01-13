import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';
import { Meteor } from "meteor/meteor";

import template from "./landing.component.html";
import { DashboardComponent } from "../dashboard/dashboard.component";
import {LoginComponent} from "../auth/login.component.web";
import {SignupComponent} from "../auth/signup.component";

@Component({
    selector: "landing",
    template
})

export class LandingComponent implements OnInit {
    login = LoginComponent;
    signup = SignupComponent;

    constructor(private navCtrl: NavController, private navParams: NavParams) {
        if(Meteor.userId()){
            this.navCtrl.setRoot(DashboardComponent);
        }
    }

    ngOnInit() {
    }
}