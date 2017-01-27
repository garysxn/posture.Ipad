import { Component, OnInit } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import {MeteorComponent} from 'angular2-meteor';
import {showAlert} from "../shared/show-alert";


import template from './postureImage.component.html';

@Component({
  selector: '',
  template
})
@InjectUser('user')
export class PostureImageComponent extends MeteorComponent implements OnInit {
   
    constructor() {
        super();
    }

    ngOnInit() {
        
    }

}
