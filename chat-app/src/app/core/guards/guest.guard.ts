import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

/** guestGuard: lo contrario de authGuard. Si YA hay sesión, no muestra el login y manda a /chat. */
export const guestGuard: CanActivateFn = () => {
  const session: SessionService = inject(SessionService);
  return session.isLoggedIn() ? inject(Router).createUrlTree(['/chat']) : true;
};
