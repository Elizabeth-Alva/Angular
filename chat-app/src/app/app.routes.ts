import { Routes } from '@angular/router';

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
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'bienvenida',
    loadComponent: () => import('./features/auth/welcome/welcome').then((m) => m.Welcome),
  },
  {
    path: 'chat',
    loadComponent: () => import('./features/chat/chat-page/chat-page').then((m) => m.ChatPage),
  },
  // "**" atrapa cualquier otra dirección que no exista.
  { path: '**', redirectTo: 'chat' },
];
