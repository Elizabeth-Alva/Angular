import { PublicUser } from './user.model';

/** Lo que la persona escribe en el formulario de login. */
export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe: boolean;
}

/**
 * Errores posibles del formulario, campo por campo.
 * El signo `?` significa "opcional": el campo puede no existir.
 */
export interface LoginErrors {
  username?: string;
  password?: string;
  general?: string;
}

/** Resultado de validar el formulario (Punto 5). */
export interface LoginValidationResult {
  valid: boolean;
  errors: LoginErrors;
}

/** Sesión que se guarda en cookie + localStorage (Punto 7). */
export interface Session {
  token: string;
  user: PublicUser;
  /** Fecha de creación en milisegundos (lo que devuelve Date.now()). */
  createdAt: number;
  /** Fecha de caducidad en milisegundos. */
  expiresAt: number;
}
