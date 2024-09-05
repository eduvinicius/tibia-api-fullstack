import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { coreRoutes } from './core.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const coreConfig: ApplicationConfig = {
  providers: [provideRouter(coreRoutes), provideAnimationsAsync()]
};
