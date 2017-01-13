import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router'
import template from './navbar.component.html';
import {InjectUser} from "angular2-meteor-accounts-ui";

declare var jQuery:any;

@Component({
    selector: 'navbar',
    template
})
@InjectUser('user')
export class NavBarComponent implements AfterViewInit {
    constructor(private router: Router) {}
  
    logout() {
        Meteor.logout();
        this.router.navigate( ['/login'] );
    }
    
    ngAfterViewInit() {
        jQuery(function($){
            $(".button-collapse").sideNav();
            $('.collapsible').collapsible();
        })
    }
}
