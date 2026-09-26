import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { welcomeGuard } from './core/guards/welcome.guard';

/**
 * Rutas de la app: cada dirección (URL) muestra una pantalla distinta.
 *
 * `loadComponent` hace "carga diferida" (lazy loading): el código de cada
 * pantalla solo se descarga cuando alguien la visita. Así la app abre más rápido.
 */
export const routes: Routes = [
  // Si la URL está vacía (http://localhost:4200/) mandamos al chat.
  { path: '', pathMatch: 'full', redirectTo: 'chat' },
  {
    path: 'login',
    // canActivate: lista de guards que deciden si se puede entrar.
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'bienvenida',
    canActivate: [welcomeGuard],
    loadComponent: () => import('./features/auth/welcome/welcome').then((m) => m.Welcome),
  },
  {
    path: 'chat',
    canActivate: [authGuard],
    loadComponent: () => import('./features/chat/chat-page/chat-page').then((m) => m.ChatPage),
  },
  // "**" atrapa cualquier otra dirección que no exista.
  { path: '**', redirectTo: 'chat' },
];
