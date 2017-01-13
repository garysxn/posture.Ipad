import {Meteor} from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import {Patients} from "../../both/collections/csvs.collection";
//import {Patient} from "../../both/models/csv.model";
//import {check} from "meteor/check";
//import {Email} from "meteor/email";
//import {isValidEmail, isValidName, isValidPhone} from "../../both/validators";

Meteor.methods({
    
    //----------------check valid patients------------//
    "patientList": () => {
        var patientData = Patients.collection.find().fetch();
        //console.log(patientData,'patientData');
        if (patientData) {
            return patientData;
        }else{
            throw new Meteor.Error(403, "Patient not found.");
        }
        
    },
    
    //-------create patients----------//
    "insertPatient": (patientObj) => {
        if (patientObj) {
            let patientId = Patients.collection.insert(patientObj);
                console.log("patientId:", patientId);
            
            return patientId;
        }else{
            throw new Meteor.Error(403, "error.");
        }
    },

    

});