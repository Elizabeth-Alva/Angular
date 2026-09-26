import { isLoginCredentials, validateCredentials } from './login-validator';

describe('validateCredentials', () => {
  it('rechaza usuario vacío', () => {
    const r = validateCredentials({ username: '', password: '123456', rememberMe: false });
    expect(r.valid).toBe(false);
    expect(r.errors.username).toBeDefined();
  });

  it('rechaza usuario con caracteres no permitidos', () => {
    const r = validateCredentials({ username: 'ana torres!', password: '123456', rememberMe: false });
    expect(r.errors.username).toBeDefined();
  });

  it('rechaza contraseña corta', () => {
    const r = validateCredentials({ username: 'ana', password: '123', rememberMe: false });
    expect(r.valid).toBe(false);
    expect(r.errors.password).toBe('Mínimo 6 caracteres');
  });

  it('acepta datos correctos', () => {
    expect(validateCredentials({ username: 'ana', password: '123456', rememberMe: true }).valid).toBe(true);
  });
});

describe('isLoginCredentials', () => {
  it('reconoce un objeto válido', () => {
    expect(isLoginCredentials({ username: 'a', password: 'b', rememberMe: true })).toBe(true);
  });

  it('rechaza valores con otra forma', () => {
    expect(isLoginCredentials(null)).toBe(false);
    expect(isLoginCredentials('texto')).toBe(false);
    expect(isLoginCredentials({ username: 'a', password: 1, rememberMe: true })).toBe(false);
  });
});
