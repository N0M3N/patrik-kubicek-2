import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { LocalizationService } from './services/localization.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LocalizePipe } from './pipes/localize.pipe';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
        provideHttpClient(withFetch()),
        LocalizationService,
        LocalizePipe,
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
        })
    ],
};
