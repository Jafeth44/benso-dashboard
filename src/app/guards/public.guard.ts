import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of, timeout } from 'rxjs';
import { AuthService } from '../auth/auth.service';

const AUTH_STATE_TIMEOUT_MS = 10000;

export const publicGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authState = inject(AuthService).authState$;
  return authState.pipe(
    timeout(AUTH_STATE_TIMEOUT_MS),
    map(user => {
      if(user) {
        router.navigateByUrl('/dashboard');
        return false;
      }
      return true;
    }),
    catchError(() => {
      router.navigateByUrl('/error-conexion');
      return of(false);
    })
  )
};
