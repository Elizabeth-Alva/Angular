import { Session } from '../models';

/**
 * Type guard: comprueba que lo leído de localStorage tenga la forma de `Session`.
 * Así la app no falla si alguien modifica a mano el localStorage.
 */
export function isSession(value: unknown): value is Session {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  const user = v['user'];
  if (typeof user !== 'object' || user === null) return false;
  const u = user as Record<string, unknown>;
  return (
    typeof v['token'] === 'string' &&
    typeof v['createdAt'] === 'number' &&
    typeof v['expiresAt'] === 'number' &&
    typeof u['id'] === 'number' &&
    typeof u['username'] === 'string' &&
    typeof u['displayName'] === 'string' &&
    typeof u['avatarColor'] === 'number'
  );
}
