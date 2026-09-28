import { Component, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../../core/services/session.service';
import { Avatar } from '../../../shared/components/avatar/avatar';

/** Tiempo (ms) que se muestra la bienvenida antes de pasar al chat. */
const WELCOME_DELAY_MS: number = 3000;

/**
 * Pantalla de bienvenida: se muestra SOLO justo después de iniciar sesión
 * (lo controla welcomeGuard). Pasa sola al chat a los 3 segundos.
 */
@Component({
  selector: 'app-welcome',
  imports: [Avatar],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome implements OnDestroy {
  private readonly session: SessionService = inject(SessionService);
  private readonly router: Router = inject(Router);
  protected readonly user = this.session.user;
  /** Guardamos el temporizador para poder cancelarlo. */
  private readonly timer: ReturnType<typeof setTimeout>;

  constructor() {
    this.timer = setTimeout(() => this.goToChat(), WELCOME_DELAY_MS);
  }

  protected goToChat(): void {
    // Ya se mostró la bienvenida: la "apagamos" para que no vuelva a salir.
    this.session.justLoggedIn.set(false);
    void this.router.navigate(['/chat']);
  }

  /** Si la persona sale antes (botón), cancelamos el temporizador. */
  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
