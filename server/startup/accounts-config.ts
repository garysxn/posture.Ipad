import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
//import { Roles } from 'meteor/alanning:roles';


Accounts.onCreateUser(function(options, user) {
   // Use provided userData in options, or create an empty object
   //console.log(options,'=======', user,'options, user');
  // Roles.addUsersToRoles(user, ['patient']);
   // user profile
   if (typeof options.profile !== "undefined") {
       user.profile = options.profile || {};
   }
   // patient profile
   if (typeof options.patient !== "undefined") {
       user.patient = options.patient || {};
   }
   // user status
   if (typeof options.status !== "undefined") {
       user.status = options.status || {};
   }
   // invites array
   if (typeof options.invites !== "undefined") {
       user.invites = options.invites || [];
   }
   // user type
   user.type = options.type || "standard";
   // patient-id
   if (typeof options.patientId !== "undefined") {
       user.patientId = options.patientId;
   }
   // provider-user-id
   if (typeof options.providerId !== "undefined") {
       user.providerId = options.providerId;
   }

   // Returns the user object
   return user;
});

