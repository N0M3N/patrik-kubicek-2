import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { LocalizationService } from './services/localization.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LocalizePipe } from './pipes/localize.pipe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideHttpClient(withFetch()),
    LocalizationService,
    LocalizePipe],
};
