import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map, take } from 'rxjs';
import { AuthService } from './auth.service';
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService), router = inject(Router);
  return auth.ready$.pipe(filter(ready => ready), take(1), map(() => auth.uid ? true : router.createUrlTree(['/sign-in'])));
};
