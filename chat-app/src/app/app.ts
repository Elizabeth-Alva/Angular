import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente raíz. Ya no pinta el chat directamente: pinta
 * <router-outlet />, que es el "hueco" donde el router coloca la
 * pantalla que corresponde a la URL actual (login, bienvenida o chat).
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
