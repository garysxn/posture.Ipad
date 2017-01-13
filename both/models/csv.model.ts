import { CollectionObject } from './collection-object.model';

export interface Patient extends CollectionObject {
    csvId: string;
    firstName: string;
    lastName: string;
    dob: Date;
    email: string;
    ssn: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phoneNum: string;
    groupId: string;
    personalId: string;
    company: string;
    insurer: string;
    guarantor: string;
    providerId: string;
    accessCode?: string;
    userId?: string;
    status?: {
        isDeleted: boolean;
    };
}