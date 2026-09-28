import { User } from '../models';

/**
 * Usuarios de prueba. Solo se guarda el HASH de la contraseña,
 * nunca la contraseña en texto plano.
 * Usuario de prueba: "ele" (la contraseña se indica en el MANUAL.md).
 */
export const MOCK_USERS: User[] = [
  {
    id: 1,
    username: 'ele',
    displayName: 'Ele',
    avatarColor: 1,
    passwordHash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
  },
];
