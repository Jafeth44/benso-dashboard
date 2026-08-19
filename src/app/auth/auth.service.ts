import { Injectable, inject } from '@angular/core';

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
  updateProfile,
} from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';

export interface Credentials {
  account: string;
  password: string;
  displayName?: string;
}

const emailProvider = '@equiposbenso.com';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private toastr = inject(ToastrService);
  public readonly authState$ = authState(this.auth);

  public registerWithEmail(credentials: Credentials) {
    const originalUser = this.auth.currentUser;
    const { account, password, displayName } = credentials;
    createUserWithEmailAndPassword(this.auth, account+emailProvider, password)
      .then(({user}) => updateProfile(user, {displayName}))
      .then(() => this.toastr.success("Usuario creado correctamente"))
      .catch(() => this.toastr.error("Nombre de usuario ya está en uso"))
      .finally(() => this.auth.updateCurrentUser(originalUser))
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
