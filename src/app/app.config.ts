import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Needed for the HTTP calls to the backend API.
    provideHttpClient(),
    // withComponentInputBinding passes URL params (like :id) to component inputs.
    provideRouter(routes, withComponentInputBinding()),
  ],
};
