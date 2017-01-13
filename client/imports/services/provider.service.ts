import { Injectable } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { MeteorComponent } from 'angular2-meteor';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProviderService extends MeteorComponent {
  user: any;
  userId: string;

  constructor() { super(); }
  
  fetchData() {
    this.call('fetchProvider', (err, res) => {
      //console.log("fetchProvider:", res);
      if (typeof res !== "object") {
        return;
      }
      res.profile.fullName = res.profile.firstName + " " + res.profile.lastName;
      this.user = res;
      this.userId = res._id;
    });
  }

  getData() {
      if (typeof this.user == "undefined") {
          this.fetchData();
      }
      return this.user;
  }
}