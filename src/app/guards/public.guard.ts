import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export const publicGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authState = inject(AuthService).authState$;
  return authState.pipe(
    map(user => {
      if(user) {
        router.navigateByUrl('/dashboard');
        return false;
      }
      return true;
    })
  )
};
