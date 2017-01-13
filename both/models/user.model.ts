import { Meteor } from 'meteor/meteor';

export interface User extends Meteor.User {
    created_at: Date;
    claimed_at: Date;
    invited_at: Date;
    deleted_at: Date;
    modified_at: Date;
    is_claimed: boolean;
    is_invited: boolean;
    is_deleted: boolean;
    is_active: boolean;
    access_code: string;
    user_type: string;
    user_role: string;
    profile: Date;
}
