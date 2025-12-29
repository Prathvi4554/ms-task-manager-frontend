import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './auth';


export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(Auth)

  const token = auth.getLocalStroage('token')

  if (token) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};