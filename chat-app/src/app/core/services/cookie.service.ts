import { Injectable } from '@angular/core';

/**
 * CookieService: funciones pequeñas para leer y escribir cookies.
 * Las cookies viven en el NAVEGADOR, por eso sobreviven aunque se detenga `ng serve`.
 */
@Injectable({ providedIn: 'root' })
export class CookieService {
  /**
   * Guarda una cookie.
   * - max-age: segundos que dura (después el navegador la borra sola).
   * - path=/: la cookie vale para toda la app.
   * - SameSite=Strict: no se envía desde otros sitios (más seguro).
   * (Cuando publiques en https agrega también "; Secure".)
   */
  set(name: string, value: string, maxAgeSeconds: number): void {
    document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAgeSeconds}; path=/; SameSite=Strict`;
  }

  /** Lee una cookie; devuelve null si no existe. */
  get(name: string): string | null {
    // document.cookie es un solo texto: "a=1; b=2; c=3"
    const found: string | undefined = document.cookie
      .split('; ')
      .find((row: string) => row.startsWith(`${name}=`));
    return found ? decodeURIComponent(found.substring(name.length + 1)) : null;
  }

  /** Borra una cookie (poniendo max-age=0). */
  delete(name: string): void {
    document.cookie = `${name}=; max-age=0; path=/; SameSite=Strict`;
  }
}
