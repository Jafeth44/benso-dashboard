import { Injectable, inject } from '@angular/core';
import { AppCheck } from '@angular/fire/app-check';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from 'firebase/auth';

export type Credentials = {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private appCheck = inject(AppCheck);
  public readonly authState$ = authState(this.auth);

  public registerWithEmail(credentials: Credentials) {
    const { email, password } = credentials;
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  public async loginWithEmail(credentials: Credentials, persistanseValue: boolean) {

    const persistanse = persistanseValue
      ? browserLocalPersistence
      : browserSessionPersistence;

    const { email, password } = credentials;

    await setPersistence(this.auth, persistanse);
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  public logout() {
    return signOut(this.auth);
  }
}
