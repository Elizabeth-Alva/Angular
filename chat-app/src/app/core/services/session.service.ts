import { Injectable, computed, signal } from '@angular/core';
import { PublicUser, Session } from '../models';

/**
 * SessionService: recuerda quién inició sesión.
 * (Versión inicial: solo en memoria. En el Punto 7 se guarda en cookie + localStorage.)
 */
@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly current = signal<Session | null>(null);

  /** Usuario conectado, o null si no hay sesión. */
  readonly user = computed<PublicUser | null>(() => this.current()?.user ?? null);
  readonly isLoggedIn = computed<boolean>(() => this.current() !== null);

  start(user: PublicUser, _rememberMe: boolean): void {
    const now: number = Date.now();
    this.current.set({ token: crypto.randomUUID(), user, createdAt: now, expiresAt: now + 86_400_000 });
  }

  end(): void {
    this.current.set(null);
  }
}
