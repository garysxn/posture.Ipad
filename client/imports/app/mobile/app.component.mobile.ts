import { Meteor } from 'meteor/meteor';
import {Component, ViewChild} from "@angular/core";
import { InjectUser } from 'angular2-meteor-accounts-ui';
import {MenuController, Platform, App, Nav} from "ionic-angular";
import { StatusBar } from 'ionic-native';

import {LandingComponent} from "../layout/landing.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {PatientDetailsComponent} from "../patient/details.component";
import {LoginComponent} from "../auth/login.component.web";
import {SignupComponent} from "../auth/signup.component";

import template from "./app.component.mobile.html";

require("ionic-angular/css/ionic.css");

@Component({
  selector: "app",
  template
})
@InjectUser('user')
export class AppMobileComponent {
  @ViewChild(Nav) nav: Nav;

  // make UsersPage the root (or first) page
  rootPage: any = LandingComponent;
  pages: Array<{title: string, component: any}>;

  constructor(private app: App, private platform: Platform, private menu: MenuController) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Dashboard', component: DashboardComponent },
      { title: "My Profile", component: PatientDetailsComponent },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  logout() {
    Meteor.logout();
    this.nav.setRoot(LandingComponent);
  }

}