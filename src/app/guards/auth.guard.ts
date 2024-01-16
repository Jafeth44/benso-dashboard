import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authState = inject(AuthService).authState$;
  return authState.pipe(
    map(user => {
      if(!user) {
        router.navigateByUrl('/auth/login');
        return false;
      }
      return true;
    })
  )
};
