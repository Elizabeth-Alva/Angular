import { sha256 } from './hash.util';

describe('sha256', () => {
  it('calcula el hash conocido de "123456"', async () => {
    expect(await sha256('123456')).toBe('8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
  });

  it('siempre devuelve 64 caracteres', async () => {
    expect((await sha256('')).length).toBe(64);
  });
});
