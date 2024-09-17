import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { initialRoutes } from './initial.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const initialConfig: ApplicationConfig = {
  providers: [provideRouter(initialRoutes), provideAnimationsAsync()]
};
