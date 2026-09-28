/**
 * Una "interfaz" es un molde: dice qué campos tiene un objeto y de qué tipo
 * es cada uno. No genera código en el navegador; solo sirve para que
 * TypeScript y el editor nos avisen si nos equivocamos.
 */

/** Usuario tal como se guarda "en la base de datos" (incluye el hash). */
export interface User {
  id: number;
  username: string;
  displayName: string;
  /** Huella SHA-256 de la contraseña, en hexadecimal (Punto 3). Nunca la contraseña real. */
  passwordHash: string;
  /** Número del 1 al 6, coincide con $avatar-colors del SCSS. */
  avatarColor: number;
}

/**
 * Lo que sí se puede mostrar y guardar en el navegador: el usuario SIN el hash.
 * `Omit<T, 'campo'>` crea un tipo nuevo igual a T pero sin ese campo.
 */
export type PublicUser = Omit<User, 'passwordHash'>;
