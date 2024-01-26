import { Injectable, inject, signal } from '@angular/core';

import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  user,
} from '@angular/fire/auth';
import {
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  updateProfile,
} from 'firebase/auth';

export type Credentials = {
  account: string;
  password: string;
};

const emailProvider = '@equiposbenso.com';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  public readonly authState$ = authState(this.auth);

  public registerWithEmail(credentials: Credentials) {
    const { account, password } = credentials;
    return createUserWithEmailAndPassword(this.auth, account+emailProvider, password);
  }

  public async loginWithEmail(credentials: Credentials, persistanseValue: boolean) {
    const { account, password } = credentials;
    const persistanse = persistanseValue
      ? browserLocalPersistence
      : browserSessionPersistence;
  
    await setPersistence(this.auth, persistanse);
    await signInWithEmailAndPassword(this.auth, account+emailProvider, password);
  }

  public logout() {
    return signOut(this.auth);
  }
}
