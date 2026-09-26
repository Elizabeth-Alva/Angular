import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { LoginCredentials, PublicUser, User } from '../models';
import { MOCK_USERS } from '../data/mock-users';
import { sha256 } from '../utils/hash.util';
import { SessionService } from './session.service';
import { environment } from '../../../environments/environment';

/** AuthService: comprueba usuario y contraseña, e inicia o cierra la sesión. */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly session: SessionService = inject(SessionService);
  private readonly http: HttpClient = inject(HttpClient);

  /**
   * Devuelve `true` si el usuario y la contraseña son correctos.
   * Promise<boolean>: el resultado llega "más tarde" (petición HTTP y hash son asíncronos).
   */
  async login(credentials: LoginCredentials): Promise<boolean> {
    // 1) Normalizamos el usuario (sin espacios y en minúsculas).
    const username: string = credentials.username.trim().toLowerCase();
    // 2) Buscamos el usuario en la API (o en los datos de ejemplo si está apagada).
    const user: User | undefined = await this.findUser(username);
    // 3) Calculamos el hash de lo que la persona escribió.
    const hash: string = await sha256(credentials.password);

    // 4) Mismo resultado si el usuario no existe o si la contraseña está mal:
    //    así no revelamos qué usuarios existen.
    if (!user || user.passwordHash !== hash) return false;

    // 5) Quitamos el hash antes de guardar la sesión (nunca sale de aquí).
    this.session.start(toPublicUser(user), credentials.rememberMe);
    return true;
  }

  logout(): void {
    this.session.end();
  }

  /** GET /users?username=ele. `firstValueFrom` convierte el Observable en una Promise. */
  private async findUser(username: string): Promise<User | undefined> {
    try {
      const users: User[] = await firstValueFrom(
        this.http.get<User[]>(`${environment.apiUrl}/users`, { params: { username } }),
      );
      return users.find((u: User) => u.username === username);
    } catch {
      // API apagada: usamos los usuarios de ejemplo para poder seguir practicando.
      return MOCK_USERS.find((u: User) => u.username === username);
    }
  }
}

/** Copia el usuario sin el campo `passwordHash`. */
function toPublicUser(user: User): PublicUser {
  const { id, username, displayName, avatarColor } = user;
  return { id, username, displayName, avatarColor };
}
