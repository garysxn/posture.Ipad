import { Component, OnInit } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import {MeteorComponent} from 'angular2-meteor';
import {showAlert} from "../shared/show-alert";


import template from './posture.component.html';

@Component({
  selector: '',
  template
})
@InjectUser('user')
export class PostureComponent extends MeteorComponent implements OnInit {
   
    constructor() {
        super();
    }

    ngOnInit() {
    }

}