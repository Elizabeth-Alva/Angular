import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { SessionService } from './session.service';
import { LoginCredentials } from '../models';
import { MOCK_USERS } from '../data/mock-users';

describe('AuthService', () => {
  let auth: AuthService;
  let session: SessionService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    auth = TestBed.inject(AuthService);
    session = TestBed.inject(SessionService);
    http = TestBed.inject(HttpTestingController);
    session.end();
  });

  afterEach(() => {
    http.verify();
    session.end();
  });

  /** Hace login y responde la petición GET /users como lo haría json-server. */
  async function login(c: LoginCredentials): Promise<boolean> {
    const result: Promise<boolean> = auth.login(c);
    const req = http.expectOne((r) => r.url.endsWith('/users'));
    const username: string | null = req.request.params.get('username');
    req.flush(MOCK_USERS.filter((u) => u.username === username));
    return result;
  }

  it('inicia sesión con usuario y contraseña correctos', async () => {
    expect(await login({ username: 'ele', password: '123456', rememberMe: true })).toBe(true);
    expect(session.isLoggedIn()).toBe(true);
    expect(session.user()?.displayName).toBe('Ele');
    expect(session.justLoggedIn()).toBe(true);
  });

  it('ignora mayúsculas y espacios en el usuario', async () => {
    expect(await login({ username: '  ELE ', password: '123456', rememberMe: false })).toBe(true);
  });

  it('rechaza una contraseña incorrecta', async () => {
    expect(await login({ username: 'ele', password: 'otra-clave', rememberMe: true })).toBe(false);
    expect(session.isLoggedIn()).toBe(false);
  });

  it('rechaza un usuario que no existe', async () => {
    expect(await login({ username: 'nadie', password: '123456', rememberMe: true })).toBe(false);
  });

  it('nunca guarda el hash en la sesión ni en localStorage', async () => {
    await login({ username: 'ele', password: '123456', rememberMe: true });
    expect(session.user()).not.toHaveProperty('passwordHash');
    expect(localStorage.getItem('chat.session')).not.toContain('passwordHash');
  });

  it('si la API está apagada usa los usuarios de ejemplo', async () => {
    const result: Promise<boolean> = auth.login({ username: 'ele', password: '123456', rememberMe: true });
    http.expectOne((r) => r.url.endsWith('/users')).error(new ProgressEvent('error'));
    expect(await result).toBe(true);
  });

  it('cierra sesión', async () => {
    await login({ username: 'ele', password: '123456', rememberMe: true });
    auth.logout();
    expect(session.isLoggedIn()).toBe(false);
    expect(localStorage.getItem('chat.session')).toBeNull();
  });
});
