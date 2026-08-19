import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DataService } from '../data/data.service';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isAdmin$ = inject(DataService).isAdmin$;
  return isAdmin$.pipe(
    map(isAdmin => {
      if (!isAdmin) {
        router.navigateByUrl('/dashboard');
        return false;
      }
      return true;
    })
  )
};
