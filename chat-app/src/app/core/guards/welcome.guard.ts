import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

/**
 * welcomeGuard: la bienvenida solo se ve JUSTO después de iniciar sesión.
 * Si se entra a /bienvenida en otro momento (por ejemplo al recargar), va a /chat.
 */
export const welcomeGuard: CanActivateFn = () => {
  const session: SessionService = inject(SessionService);
  const router: Router = inject(Router);
  if (!session.isLoggedIn()) return router.createUrlTree(['/login']);
  return session.justLoggedIn() ? true : router.createUrlTree(['/chat']);
};
