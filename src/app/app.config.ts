import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MessageService} from "primeng/api";

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
    ),
    provideRouter(routes)
  ]
};
