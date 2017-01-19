import {Meteor} from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import { Patients } from "../../both/collections/csvs.collection";
//import {Patient} from "../../both/models/csv.model";
//import {check} from "meteor/check";
//import {Email} from "meteor/email";
//import {isValidEmail, isValidName, isValidPhone} from "../../both/validators";

Meteor.methods({
    
    //----------------Patient list------------//
    "patientList": (practitionerId, skip, limit, searchKey) => {
        //console.log(practitionerId, skip, limit,searchKey);
        var patientData = Patients.collection.find({practitioner:practitionerId, $or: [{firstName:{ $regex : searchKey, $options:"i" }},{lastName:{ $regex : searchKey, $options:"i" }}, {phonenumber:{ $regex : searchKey, $options:"i" }}] }, {skip: skip, limit: limit}).fetch();
        //console.log(patientData,'patientData');
        if (patientData) {
            return patientData;
        }else{
            throw new Meteor.Error(403, "Patient not found.");
        }
        
    },
    
    //-------create patients----------//
    "insertPatient": (patientObj, patientId) => {
        if (patientObj) {
            patientObj['dobtimestamp'] = removeOffset(patientObj.dob);
            if (patientId) {
                //console.log(patientId,'patientId');
                let patientIds = Patients.collection.update({_id:patientId}, {$set:patientObj});
                //console.log("patientId:", patientIds);
                return patientIds;
            }else{
                let patient_Id = Patients.collection.insert(patientObj);
                //console.log("patient_Id:", patientId);
                return patient_Id;
            }
        }else{
            throw new Meteor.Error(403, "error.");
        }
    },
    
    "patientData": function(patientId){
        var patientData = Patients.collection.findOne({_id:patientId});
        //console.log(patientData,'patientData');
        if (patientData) {
            return patientData;
        }else{
            throw new Meteor.Error(403, "Patient not found.");
        }
    }

    

});


//------date insert into db--------//
var removeOffset = function(dobFormat){ //console.log(dobFormat,'remove');
    var userOffset = new Date(dobFormat).getTimezoneOffset();
    var userOffsetMilli = userOffset*60*1000;
    var dateInMilli = moment(dobFormat).unix()*1000;
    var dateInUtc = dateInMilli-userOffsetMilli;
    //console.log(dateInUtc);
    return dateInUtc;
}

//--------display date ----------//
var addOffset = function(dobFormat){ //console.log(dobFormat,'add');
    var userOffset = new Date(dobFormat).getTimezoneOffset();
    var userOffsetMilli = userOffset*60*1000;
    var dateInMilli = moment(dobFormat).unix()*1000;
    var dateInUtc = dateInMilli+userOffsetMilli;
    //console.log(dateInUtc);
    return dateInUtc;
}