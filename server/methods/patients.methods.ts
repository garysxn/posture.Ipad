import {Meteor} from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import { Patients, Appointments } from "../../both/collections/csvs.collection";
import * as moment from 'moment';
//import {check} from "meteor/check";
//import {Email} from "meteor/email";
//import {isValidEmail, isValidName, isValidPhone} from "../../both/validators";

Meteor.methods({
    
    /*Patient list*/
    "patientList": (practitionerId, skip, limit, searchKey) => {
        //console.log(practitionerId, skip, limit,searchKey);
        var patientData = Patients.collection.find({practitioner:practitionerId,
                                                   $or: [{firstName:{ $regex : searchKey, $options:"i" }},
                                                        {lastName:{ $regex : searchKey, $options:"i" }},
                                                        {phonenumber:{ $regex : searchKey, $options:"i" }}]
                                                   },
                                                   {skip: skip, limit: limit}).fetch();
        //console.log(patientData,'patientData');
        if (patientData) {
            return patientData;
        }else{
            throw new Meteor.Error(403, "Patient not found.");
        }
        
    },
    
    /*create patients*/
    "insertPatient": function(patientObj, patientId):any{
        if (patientObj) {
            patientObj['dobtimestamp'] = removeOffset(patientObj.dob);
            
            if (patientId) {
                //console.log(patientId,'patientId');
                let patientIds = Patients.collection.update({_id:patientId}, {$set:patientObj});
                if (patientIds) {
                    //console.log("patientId:", patientIds);
                    return patientIds;    
                }                
            }else{
                let isExists = Patients.collection.findOne({email:patientObj.email});
                if (isExists) {
                    throw new Meteor.Error(403, "Patient email address already exists.");
                }else{
                    let patient_Id = Patients.collection.insert(patientObj);
                    if (patient_Id) {
                        return patient_Id;
                    }    
                }
                
                /*
                var appointmentObj = {
                    "appointmentTime" : "12:50",
                    "appointmentDate" : "2017-12-12",
                    "type" : "posture",
                    "patient" : patient_Id,
                    "practitioner" : patientObj.practitioner
                }
                let appointmentId = Appointments.collection.insert(appointmentObj);
                console.log(appointmentId,'appointmentObj');
                */
                //console.log(appointmentId,"patient_Id:", patientId);
                
            }
        }else{
            throw new Meteor.Error(403, "error.");
        }
    },
    
    /*fatch patient data*/
    "patientData": function(patientId){
        var patientData = Patients.collection.findOne({_id:patientId});
        //console.log(patientData,'patientData');
        if (patientData) {
            return patientData;
        }else{
            throw new Meteor.Error(403, "Patient not found.");
        }
    },
    
    /*insert appointment data*/
    "insertAppointment": function(appointmentObj){
        //console.log(appointmentObj,'appointmentObj');
        let appointmentId = Appointments.collection.insert(appointmentObj);
        //console.log(appointmentId,"appointmentId");
        return appointmentId;
    },

    /*fatch appointment data*/
    "appointmentData": function(patientId){
        var appointmentData = Appointments.collection.find({patient:patientId}).fetch();
        //console.log(appointmentData,'appointmentData');
        if (appointmentData) {
            return appointmentData;
        }else{
            throw new Meteor.Error(403, "Appointment Data not found.");
        }
    },

});


/*date insert into db*/
var removeOffset = function(dobFormat){ //console.log(dobFormat,'remove');
    var userOffset = new Date(dobFormat).getTimezoneOffset();
    var userOffsetMilli = userOffset*60*1000;
    var dateInMilli = moment(dobFormat).unix()*1000;
    var dateInUtc = dateInMilli-userOffsetMilli;
    //console.log(dateInUtc);
    return dateInUtc;
}

/*display date*/
var addOffset = function(dobFormat){ //console.log(dobFormat,'add');
    var userOffset = new Date(dobFormat).getTimezoneOffset();
    var userOffsetMilli = userOffset*60*1000;
    var dateInMilli = moment(dobFormat).unix()*1000;
    var dateInUtc = dateInMilli+userOffsetMilli;
    //console.log(dateInUtc);
    return dateInUtc;
}