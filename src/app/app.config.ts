import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import  localeCR  from '@angular/common/locales/es';

import { getApp, initializeApp, provideFirebaseApp,  } from '@angular/fire/app';
import { getAuth, connectAuthEmulator, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeFirestore, connectFirestoreEmulator, persistentLocalCache, persistentMultipleTabManager, provideFirestore } from '@angular/fire/firestore';
import { provideAppCheck, initializeAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';
import { getStorage, connectStorageEmulator, provideStorage } from '@angular/fire/storage';

import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeCR);

declare global {
  interface Window {
    FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean;
  }
}

if (environment.useEmulators) {
  // Lets App Check accept requests from the local emulator suite/dev server
  // instead of requiring a real ReCaptcha token. See:
  // https://firebase.google.com/docs/app-check/web/debug-provider
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideFirebaseApp(() => initializeApp(environment.config)),
    provideAppCheck(() => initializeAppCheck(getApp(), {provider: new ReCaptchaV3Provider('6LeEY1QpAAAAAGZURIQFpD05BgnJ4tKf15TdbEER'),})),
    provideAuth(() => {
      const auth = getAuth();
      if (environment.useEmulators) {
        connectAuthEmulator(auth, 'http://localhost:9099');
      }
      return auth;
    }),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    provideFirestore(() => {
      const firestore = initializeFirestore(getApp(), { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }), experimentalForceLongPolling: true });
      if (environment.useEmulators) {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      }
      return firestore;
    }),
    provideStorage(() => {
      const storage = getStorage();
      if (environment.useEmulators) {
        connectStorageEmulator(storage, 'localhost', 9199);
      }
      return storage;
    }),
    provideAnimations(),
    provideToastr({ closeButton: true, timeOut: 2500, progressBar: true }),
    { provide: LOCALE_ID, useValue: 'es-CR' },
  ],
};
