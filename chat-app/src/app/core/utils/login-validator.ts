import { LoginCredentials, LoginErrors, LoginValidationResult } from '../models';

/**
 * Expresión regular (patrón) para el usuario:
 * solo letras, números, punto, guion bajo o guion, de 3 a 20 caracteres.
 */
const USERNAME_PATTERN: RegExp = /^[a-zA-Z0-9._-]{3,20}$/;
const MIN_PASSWORD_LENGTH: number = 6;

/**
 * Valida el formulario de login.
 * Recibe un objeto con la forma de `LoginCredentials` y devuelve
 * uno con la forma de `LoginValidationResult`. Las interfaces
 * funcionan como un "contrato" de entrada y salida.
 */
export function validateCredentials(c: LoginCredentials): LoginValidationResult {
  const errors: LoginErrors = {};
  const username: string = c.username.trim();

  if (username === '') {
    errors.username = 'Escribe tu usuario';
  } else if (!USERNAME_PATTERN.test(username)) {
    errors.username = 'Solo letras, números, punto o guion (3 a 20 caracteres)';
  }

  if (c.password === '') {
    errors.password = 'Escribe tu contraseña';
  } else if (c.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Mínimo ${MIN_PASSWORD_LENGTH} caracteres`;
  }

  // Es válido si el objeto de errores quedó vacío.
  return { valid: Object.keys(errors).length === 0, errors };
}

/**
 * "Type guard" (guardián de tipo): revisa en tiempo de ejecución si un valor
 * desconocido (`unknown`, por ejemplo algo leído de localStorage o de una API)
 * tiene realmente la forma de `LoginCredentials`.
 * El tipo de retorno `value is LoginCredentials` le enseña a TypeScript
 * que, si devuelve true, puede tratar `value` como LoginCredentials.
 */
export function isLoginCredentials(value: unknown): value is LoginCredentials {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v['username'] === 'string' &&
    typeof v['password'] === 'string' &&
    typeof v['rememberMe'] === 'boolean'
  );
}
