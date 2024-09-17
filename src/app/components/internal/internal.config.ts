import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { internalRoutes } from './internal.routes';

export const internalConfig: ApplicationConfig = {
  providers: [provideRouter(internalRoutes), provideAnimationsAsync()]
};
