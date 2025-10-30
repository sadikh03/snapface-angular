import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isLoggedIn = localStorage.getItem('token') !== null; // Exemple simple

  if (isLoggedIn) {
    return true;
  } else {
    router.navigateByUrl('/');
    return false;
  }
};
