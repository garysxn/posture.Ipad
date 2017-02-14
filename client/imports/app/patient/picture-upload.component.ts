import { Meteor } from "meteor/meteor";
import { Component, OnInit } from "@angular/core";
import { MeteorComponent } from 'angular2-meteor';
import { NavController, NavParams } from 'ionic-angular';
import { upload } from '../../../../both/methods/images.methods';
import { Patient } from "../../../../both/models/csv.model";
import { Image } from "../../../../both/models/image.model";
import { PatientListComponent } from "./details.component";
import { showAlert } from "../shared/show-alert";

import template from "./picture-upload.html";

@Component({
    selector: "",
    template
})
export class PictureUploadComponent extends MeteorComponent implements OnInit {
    isUploading: boolean = false;
    isUploaded: boolean = false;
    _patients: Patient[] = null;
    practitionerId: string;
    patientId: string;
    imageId: string;
    image: Image;
    searchString: string;
 
    constructor(private navCtrl: NavController, private navParams: NavParams) {
        super();
    }
    
    onFileSelect(event) {
        var files = event.srcElement.files;
        console.log(files);
        this.startUpload(files[0]);
    }

    ngOnInit() {
        this.practitionerId = Meteor.userId();
        this.patientId = this.navParams.get('patientId');
    }

    private startUpload(file: File): void {
        // check for previous upload
        if (this.isUploading === true) {
            console.log("aleady uploading...");
            return;
        }
        
        // start uploading
        this.isUploaded = false;
        //console.log('file uploading...');
        this.isUploading = true;

        upload(file)
        .then((res) => {
            this.isUploading = false;
            this.isUploaded = true;
            this.image = res;
            this.imageId = res._id;
            console.log("file upload done.")
            console.log("file id:", res._id);
            this.savePicture();
        })
        .catch((error) => {
            this.isUploading = false;
            console.log('Error in file upload:', error);
            showAlert(error.reason, "danger");
        });
    }

    savePicture() {
        let patientId = this.patientId;
        console.log("patientId:", patientId);
        
        this.call("patients.addPicture", patientId, this.imageId, (err, res) => {
            if (err) {                    
                console.log("Error while saving patient picture.");
                return;
            }
            console.log("Picture added to patient successfully.");
            showAlert("Picture has been saved successfully.", "success");
            this.navCtrl.setRoot(PatientListComponent);
        });
    }
}
