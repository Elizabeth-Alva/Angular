import { Injectable, computed, inject, signal } from '@angular/core';
import { PublicUser, Session } from '../models';
import { CookieService } from './cookie.service';
import { isSession } from '../utils/session-guard';

/** Nombres con los que guardamos las cosas en el navegador. */
export const STORAGE_KEY: string = 'chat.session';
export const COOKIE_NAME: string = 'chat_token';

const ONE_DAY: number = 60 * 60 * 24; // en segundos
const THIRTY_DAYS: number = ONE_DAY * 30;

/**
 * SessionService: recuerda quién inició sesión, INCLUSO si se recarga la
 * página o se detiene y vuelve a iniciar `ng serve`.
 *
 * Se guarda en DOS lugares y la sesión solo es válida si existen AMBOS
 * y el token coincide:
 *  - Cookie `chat_token`: el token y cuánto dura (caduca sola).
 *  - localStorage `chat.session`: la sesión completa en JSON (usuario SIN hash).
 */
@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly cookies: CookieService = inject(CookieService);
  private readonly current = signal<Session | null>(null);

  /**
   * true solo justo después de iniciar sesión con el formulario.
   * Sirve para mostrar la bienvenida SOLO en ese momento
   * (no cuando la sesión se restaura sola al recargar).
   */
  readonly justLoggedIn = signal<boolean>(false);

  readonly user = computed<PublicUser | null>(() => this.current()?.user ?? null);
  readonly isLoggedIn = computed<boolean>(() => this.current() !== null);

  /** Crea una sesión nueva y la guarda en cookie + localStorage. */
  start(user: PublicUser, rememberMe: boolean): void {
    const seconds: number = rememberMe ? THIRTY_DAYS : ONE_DAY;
    const now: number = Date.now();
    const session: Session = {
      token: crypto.randomUUID(), // texto aleatorio único
      user,
      createdAt: now,
      expiresAt: now + seconds * 1000,
    };
    this.cookies.set(COOKIE_NAME, session.token, seconds);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    this.current.set(session);
    this.justLoggedIn.set(true);
  }

  /** Se llama UNA vez al arrancar la app (ver app.config.ts). */
  restore(): void {
    const token: string | null = this.cookies.get(COOKIE_NAME);
    const raw: string | null = localStorage.getItem(STORAGE_KEY);
    // Si falta cualquiera de las dos, no hay sesión.
    if (!token || !raw) {
      this.end();
      return;
    }

    let data: unknown;
    try {
      data = JSON.parse(raw);
    } catch {
      this.end(); // el JSON estaba dañado
      return;
    }

    if (!isSession(data) || data.token !== token || data.expiresAt < Date.now()) {
      this.end();
      return;
    }
    this.current.set(data);
  }

  /** Cierra la sesión: borra cookie, localStorage y memoria. */
  end(): void {
    this.cookies.delete(COOKIE_NAME);
    localStorage.removeItem(STORAGE_KEY);
    this.current.set(null);
    this.justLoggedIn.set(false);
  }
}
