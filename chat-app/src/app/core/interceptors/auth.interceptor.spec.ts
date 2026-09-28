import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { authInterceptor } from './auth.interceptor';
import { CookieService } from '../services/cookie.service';
import { COOKIE_NAME } from '../services/session.service';

describe('authInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptors([authInterceptor])), provideHttpClientTesting()],
    });
  });

  afterEach(() => TestBed.inject(CookieService).delete(COOKIE_NAME));

  it('agrega el token si hay cookie', () => {
    TestBed.inject(CookieService).set(COOKIE_NAME, 'abc', 60);
    TestBed.inject(HttpClient).get('/x').subscribe();
    const req = TestBed.inject(HttpTestingController).expectOne('/x');
    expect(req.request.headers.get('Authorization')).toBe('Bearer abc');
  });

  it('no agrega nada si no hay cookie', () => {
    TestBed.inject(HttpClient).get('/x').subscribe();
    const req = TestBed.inject(HttpTestingController).expectOne('/x');
    expect(req.request.headers.has('Authorization')).toBe(false);
  });
});
