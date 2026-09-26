import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from '../services/cookie.service';
import { COOKIE_NAME } from '../services/session.service';

/**
 * Interceptor: una función que "intercepta" CADA petición HTTP antes de salir.
 * Si hay sesión, le agrega el encabezado `Authorization: Bearer <token>`.
 * (json-server lo ignora, pero una API real lo usaría para saber quién eres.)
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token: string | null = inject(CookieService).get(COOKIE_NAME);
  // Las peticiones son inmutables: para cambiarlas se hace una copia con clone().
  return next(token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req);
};
