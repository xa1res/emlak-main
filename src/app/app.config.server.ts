// src/app/app.config.server.ts
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverOnly: ApplicationConfig = {
  providers: [ provideServerRendering(withRoutes(serverRoutes)) ]
};

export const config = mergeApplicationConfig(appConfig, serverOnly);
