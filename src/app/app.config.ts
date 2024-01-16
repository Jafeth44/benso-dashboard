import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'equipos-benso',
          appId: '1:913821914666:web:30a5704167bc1bef445553',
          storageBucket: 'equipos-benso.appspot.com',
          apiKey: 'AIzaSyBg9gRukHOHB6IoJOzN7iV0-B0GjvDL3e8',
          authDomain: 'equipos-benso.firebaseapp.com',
          messagingSenderId: '913821914666',
          measurementId: 'G-SCK7JGJ167',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideAnalytics(() => getAnalytics())),
    ScreenTrackingService,
    UserTrackingService, 
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
