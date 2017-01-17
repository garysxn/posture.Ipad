import {Meteor} from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import { Patients } from "../../both/collections/csvs.collection";
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
            patientObj['dobtimestamp'] = removeOffset(patientObj.dob);
            let patientId = Patients.collection.insert(patientObj);
                //console.log("patientId:", patientId);
            
            return patientId;
        }else{
            throw new Meteor.Error(403, "error.");
        }
    },

    

});


//------date insert into db--------//
removeOffset = function(dobFormat){console.log(dobFormat,'remove');
    var userOffset = new Date(dobFormat).getTimezoneOffset();
    var userOffsetMilli = userOffset*60*1000;
    var dateInMilli = moment(dobFormat).unix()*1000;
    var dateInUtc = dateInMilli-userOffsetMilli;
    console.log(dateInUtc);
    return dateInUtc;
}

//--------display date ----------//
addOffset = function(dobFormat){ console.log(dobFormat,'add');
    var userOffset = new Date(dobFormat).getTimezoneOffset();
    var userOffsetMilli = userOffset*60*1000;
    var dateInMilli = moment(dobFormat).unix()*1000;
    var dateInUtc = dateInMilli+userOffsetMilli;
    console.log(dateInUtc);
    return dateInUtc;
}