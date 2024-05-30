import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import  localeCR  from '@angular/common/locales/es';

import { getApp, initializeApp, provideFirebaseApp,  } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, provideFirestore } from '@angular/fire/firestore';
import { provideAppCheck, initializeAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeCR);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideFirebaseApp(() => initializeApp(environment.config)),
    provideAppCheck(() => initializeAppCheck(getApp(), {provider: new ReCaptchaV3Provider('6LeEY1QpAAAAAGZURIQFpD05BgnJ4tKf15TdbEER'),})),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    provideFirestore(() => initializeFirestore(getApp(), { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }), experimentalForceLongPolling: true })),
    provideStorage(() => getStorage()),
    provideAnimations(),
    provideToastr({ closeButton: true, timeOut: 2500, progressBar: true }),
    { provide: LOCALE_ID, useValue: 'es-CR' },
    provideAnimations()
  ],
};
