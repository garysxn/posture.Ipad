import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { SignupComponent } from "./auth/singup.component";
import { RecoverComponent } from "./auth/recover.component";
import { LoginComponent } from "./auth/login.component.web";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LandingComponent } from "./layout/landing.component";

let mainRoutes = [
    { path: '', component: LandingComponent/*, canActivate: ['canActivateForLogoff']*/ },
    { path: 'dashboard', component: DashboardComponent, canActivate: ['canActivateForLoggedIn'] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signup/:code', component: SignupComponent },
    { path: 'recover', component: RecoverComponent },
];

export const routes: Route[] = [
    ...mainRoutes,
];

export const ROUTES_PROVIDERS = [
    {
        provide: 'canActivateForLoggedIn',
        useValue: () => !! Meteor.userId()
    },
    {
        provide: 'canActivateForLogoff',
        useValue: () => ! Meteor.userId()
    },
];