import { Injectable, inject } from '@angular/core';
import { LoginCredentials, PublicUser, User } from '../models';
import { MOCK_USERS } from '../data/mock-users';
import { sha256 } from '../utils/hash.util';
import { SessionService } from './session.service';

/** AuthService: comprueba usuario y contraseña, e inicia o cierra la sesión. */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly session: SessionService = inject(SessionService);

  /**
   * Devuelve `true` si el usuario y la contraseña son correctos.
   * Promise<boolean>: el resultado llega "más tarde" porque el hash es asíncrono.
   */
  async login(credentials: LoginCredentials): Promise<boolean> {
    // 1) Calculamos el hash de lo que la persona escribió.
    const hash: string = await sha256(credentials.password);
    // 2) Buscamos el usuario (sin espacios y en minúsculas).
    const username: string = credentials.username.trim().toLowerCase();
    const user: User | undefined = MOCK_USERS.find((u: User) => u.username === username);

    // 3) Mismo resultado si el usuario no existe o si la contraseña está mal:
    //    así no revelamos qué usuarios existen.
    if (!user || user.passwordHash !== hash) return false;

    // 4) Quitamos el hash antes de guardar la sesión (nunca sale de aquí).
    this.session.start(toPublicUser(user), credentials.rememberMe);
    return true;
  }

  logout(): void {
    this.session.end();
  }
}

/** Copia el usuario sin el campo `passwordHash`. */
function toPublicUser(user: User): PublicUser {
  const { id, username, displayName, avatarColor } = user;
  return { id, username, displayName, avatarColor };
}
