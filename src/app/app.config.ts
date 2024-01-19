import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { getApp, initializeApp, provideFirebaseApp,  } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { connectFirestoreEmulator, initializeFirestore, persistentLocalCache, persistentMultipleTabManager, provideFirestore } from '@angular/fire/firestore';
import { provideAppCheck, initializeAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';
import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage';

import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.config))),
    importProvidersFrom(provideAppCheck(() => initializeAppCheck(getApp(), {
      provider: new ReCaptchaV3Provider('6LeEY1QpAAAAAGZURIQFpD05BgnJ4tKf15TdbEER'),
    }))),
    importProvidersFrom(provideAuth(() => {
      const auth = getAuth();
      // !environment.production ? connectAuthEmulator(auth, 'http://127.0.0.1:9099') : null;
      return auth;
    })),
    importProvidersFrom(provideAnalytics(() => getAnalytics())),
    ScreenTrackingService,
    UserTrackingService, 
    importProvidersFrom(provideFirestore(() => {
      const firestore = initializeFirestore(getApp(), {localCache: persistentLocalCache({tabManager: persistentMultipleTabManager()}), experimentalForceLongPolling: true});
      // !environment.production ? connectFirestoreEmulator(firestore, 'localhost', 8080) : null;
      return firestore;
    })),
    importProvidersFrom(provideStorage(() => {
      const storage = getStorage();
      // !environment.production ? connectStorageEmulator(storage, 'localhost', 9199) : null;
      return storage;
    })),
    provideAnimations(),
    provideToastr()
  ],
};
