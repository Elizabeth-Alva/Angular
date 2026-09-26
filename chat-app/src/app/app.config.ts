import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { SessionService } from './core/services/session.service';

/** Configuración global de la app (lo que antes era el "AppModule"). */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Se ejecuta ANTES de mostrar la primera pantalla: lee la cookie y el
    // localStorage y restaura la sesión. Así los guards ya saben si hay sesión.
    provideAppInitializer(() => inject(SessionService).restore()),
  ],
};
