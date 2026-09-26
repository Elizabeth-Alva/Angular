import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Welcome } from './welcome';
import { SessionService } from '../../../core/services/session.service';

describe('Welcome', () => {
  it('saluda al usuario conectado', async () => {
    TestBed.configureTestingModule({ imports: [Welcome], providers: [provideRouter([])] });
    TestBed.inject(SessionService).start({ id: 1, username: 'ele', displayName: 'Ele', avatarColor: 1 }, false);
    const fixture = TestBed.createComponent(Welcome);
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('¡Hola, Ele!');
    fixture.destroy();
    TestBed.inject(SessionService).end();
  });
});
