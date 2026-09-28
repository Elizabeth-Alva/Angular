import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

/**
 * Guard ("guardia") de rutas: decide si se puede entrar a una pantalla.
 * authGuard: solo deja pasar si hay sesión; si no, manda a /login.
 */
export const authGuard: CanActivateFn = () => {
  const session: SessionService = inject(SessionService);
  return session.isLoggedIn() ? true : inject(Router).createUrlTree(['/login']);
};
