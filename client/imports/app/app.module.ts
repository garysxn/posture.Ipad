import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountsModule } from 'angular2-meteor-accounts-ui';
import { Ng2PaginationModule } from 'ng2-pagination';
import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from "angular-2-local-storage";
import { FileDropModule } from "angular2-file-drop";
import { MOBILE_DECLARATIONS } from "./mobile/index";
import { AppMobileComponent } from "./mobile/app.component.mobile";
import { IonicModule, IonicApp } from "ionic-angular";
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import { AppComponent } from "./app.component.web";
import { routes, ROUTES_PROVIDERS } from './app.routes';
import { SHARED_DECLARATIONS } from './shared';
import { AUTH_DECLARATIONS } from "./auth/index";
import { LAYOUT_DECLARATIONS } from "./layout/index";
import { INDEX_DECLARATIONS } from "./index";

import { ProviderService } from "../services/provider.service";

// Create config options (see ILocalStorageServiceConfigOptions) for deets:
let localStorageServiceConfig = {
    prefix: 'my-app',
    storageType: 'sessionStorage'
};

let moduleDefinition;

moduleDefinition = {
  imports: [
    IonicModule.forRoot(AppMobileComponent),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AccountsModule,
    Ng2PaginationModule,
    FileDropModule,
    InfiniteScrollModule
  ],
  declarations: [
    ...SHARED_DECLARATIONS,
    ...AUTH_DECLARATIONS,
    ...INDEX_DECLARATIONS,
    ...LAYOUT_DECLARATIONS,
    ...MOBILE_DECLARATIONS
  ],
  providers: [
    LocalStorageService,
      {
          provide: LOCAL_STORAGE_SERVICE_CONFIG, useValue: localStorageServiceConfig
      },
    ProviderService
  ],
  entryComponents: [
    ...AUTH_DECLARATIONS,
    ...MOBILE_DECLARATIONS,
    ...INDEX_DECLARATIONS,
    ...LAYOUT_DECLARATIONS
  ],
  bootstrap: [
    IonicApp
  ]
}

@NgModule(moduleDefinition)
export class AppModule {
  constructor() {
    
  }
}