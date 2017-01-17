import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
import { Patient} from "../models/csv.model";


export const Patients = new MongoObservable.Collection<Patient>("patients");


//function loggedIn(userId) {
//  return !!userId;
//}
 
