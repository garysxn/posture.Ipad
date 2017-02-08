import { CollectionObject } from './collection-object.model';

export interface Patient extends CollectionObject {
    firstName: string;
    lastName: string;
    dob: Date;
    email: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phonenumber: string;
    height: string;
    weight: string;
    occupation: string;
    practitioner: string;
    dobtimestamp: number;
    images: string[];
}