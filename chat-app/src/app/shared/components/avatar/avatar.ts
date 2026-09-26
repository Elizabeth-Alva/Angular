import { Component, input } from '@angular/core';

/**
 * Avatar: el círculo de color con las iniciales de una persona.
 *
 * Está en "shared" porque se repite en varias pantallas (lista de chats,
 * encabezado y bienvenida). Los estilos `.avatar` están en `src/styles.scss`
 * porque son globales.
 */
@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.html',
  // ":host { display: contents }" hace que la etiqueta <app-avatar> no
  // agregue una caja extra y no rompa el diseño flexbox del padre.
  styles: ':host { display: contents; }',
})
export class Avatar {
  /** input.required: el padre ESTÁ OBLIGADO a mandar las iniciales. */
  readonly initials = input.required<string>();
  /** Número de color del 1 al 6 (coincide con $avatar-colors del SCSS). */
  readonly color = input<number>(1);
  /** Si es true, se dibuja el puntito verde de "en línea". */
  readonly online = input<boolean>(false);
}
