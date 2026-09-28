import { TestBed } from '@angular/core/testing';
import { COOKIE_NAME, STORAGE_KEY, SessionService } from './session.service';
import { CookieService } from './cookie.service';
import { PublicUser } from '../models';

const USER: PublicUser = { id: 1, username: 'ele', displayName: 'Ele', avatarColor: 1 };

describe('SessionService', () => {
  let session: SessionService;
  let cookies: CookieService;

  beforeEach(() => {
    session = TestBed.inject(SessionService);
    cookies = TestBed.inject(CookieService);
    session.end();
  });

  it('guarda token en cookie y sesión en localStorage', () => {
    session.start(USER, true);
    const token: string | null = cookies.get(COOKIE_NAME);
    expect(token).toBeTruthy();
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).token).toBe(token);
  });

  it('restaura la sesión (simula reiniciar la app)', () => {
    session.start(USER, true);
    // Un servicio nuevo = la app arrancó de nuevo.
    const nueva = TestBed.runInInjectionContext(() => new SessionService());
    nueva.restore();
    expect(nueva.isLoggedIn()).toBe(true);
    expect(nueva.user()?.username).toBe('ele');
    expect(nueva.justLoggedIn()).toBe(false);
  });

  it('no restaura si falta la cookie', () => {
    session.start(USER, true);
    cookies.delete(COOKIE_NAME);
    session.restore();
    expect(session.isLoggedIn()).toBe(false);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('no restaura si falta el localStorage', () => {
    session.start(USER, true);
    localStorage.removeItem(STORAGE_KEY);
    session.restore();
    expect(session.isLoggedIn()).toBe(false);
  });

  it('no restaura si el token no coincide o el JSON está dañado', () => {
    session.start(USER, true);
    cookies.set(COOKIE_NAME, 'otro-token', 60);
    session.restore();
    expect(session.isLoggedIn()).toBe(false);

    cookies.set(COOKIE_NAME, 'x', 60);
    localStorage.setItem(STORAGE_KEY, '{roto');
    session.restore();
    expect(session.isLoggedIn()).toBe(false);
  });
});
