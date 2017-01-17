import {Meteor} from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
    
    //---------practitioner signup-----------//
    "insertPractitioner": function(obj,code){
        //console.log(obj,code,'obj,code');
        if (obj) {
            var practitionerId = Accounts.createUser(obj);
            Roles.addUsersToRoles(practitionerId, ['practitioner']);
            return practitionerId;    
        }
    }    
    
});