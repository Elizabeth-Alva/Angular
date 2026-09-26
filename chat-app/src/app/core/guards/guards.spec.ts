import { TestBed } from '@angular/core/testing';
import { Router, UrlTree, provideRouter } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { authGuard } from './auth.guard';
import { guestGuard } from './guest.guard';
import { welcomeGuard } from './welcome.guard';
import { SessionService } from '../services/session.service';

/** Ejecuta un guard dentro del inyector de pruebas y devuelve la URL o true. */
function run(guard: typeof authGuard): string | boolean {
  const r = TestBed.runInInjectionContext(() =>
    guard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
  );
  return r instanceof UrlTree ? TestBed.inject(Router).serializeUrl(r) : (r as boolean);
}

describe('Guards', () => {
  let session: SessionService;
  const user = { id: 1, username: 'ele', displayName: 'Ele', avatarColor: 1 };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    session = TestBed.inject(SessionService);
    session.end();
  });

  it('sin sesión: chat → login, login permitido, bienvenida → login', () => {
    expect(run(authGuard)).toBe('/login');
    expect(run(guestGuard)).toBe(true);
    expect(run(welcomeGuard)).toBe('/login');
  });

  it('recién iniciada la sesión: se ve la bienvenida', () => {
    session.start(user, true);
    expect(run(authGuard)).toBe(true);
    expect(run(guestGuard)).toBe('/chat');
    expect(run(welcomeGuard)).toBe(true);
  });

  it('sesión restaurada: la bienvenida redirige al chat', () => {
    session.start(user, true);
    session.justLoggedIn.set(false);
    expect(run(welcomeGuard)).toBe('/chat');
  });
});
