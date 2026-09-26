import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { SessionService } from './session.service';

describe('AuthService', () => {
  let auth: AuthService;
  let session: SessionService;

  beforeEach(() => {
    auth = TestBed.inject(AuthService);
    session = TestBed.inject(SessionService);
    session.end();
  });

  it('inicia sesión con usuario y contraseña correctos', async () => {
    const ok: boolean = await auth.login({ username: 'ele', password: '123456', rememberMe: true });
    expect(ok).toBe(true);
    expect(session.isLoggedIn()).toBe(true);
    expect(session.user()?.displayName).toBe('Ele');
  });

  it('ignora mayúsculas y espacios en el usuario', async () => {
    expect(await auth.login({ username: '  ELE ', password: '123456', rememberMe: false })).toBe(true);
  });

  it('rechaza una contraseña incorrecta', async () => {
    expect(await auth.login({ username: 'ele', password: 'otra-clave', rememberMe: true })).toBe(false);
    expect(session.isLoggedIn()).toBe(false);
  });

  it('rechaza un usuario que no existe', async () => {
    expect(await auth.login({ username: 'nadie', password: '123456', rememberMe: true })).toBe(false);
  });

  it('nunca guarda el hash en la sesión', async () => {
    await auth.login({ username: 'ele', password: '123456', rememberMe: true });
    expect(session.user()).not.toHaveProperty('passwordHash');
  });

  it('cierra sesión', async () => {
    await auth.login({ username: 'ele', password: '123456', rememberMe: true });
    auth.logout();
    expect(session.isLoggedIn()).toBe(false);
  });
});
