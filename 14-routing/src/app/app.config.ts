import { ApplicationConfig } from "@angular/core";
import { provideRouter, withComponentInputBinding, withRouterConfig } from "@angular/router";
import { APP_ROUTES } from "./app.routes";

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    provideRouter( APP_ROUTES, withComponentInputBinding(), withRouterConfig( {
      paramsInheritanceStrategy: "always"
    } ) )
  ]
};