// Angular'ın change detection mekanizması için gerekli
import 'zone.js';

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app'; // senin kök bileşenin adı App

bootstrapApplication(App, appConfig)
  .catch(err => console.error(err));
