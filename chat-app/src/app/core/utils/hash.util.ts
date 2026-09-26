/**
 * Devuelve el SHA-256 de un texto, en hexadecimal (64 caracteres).
 *
 * Un "hash" es una huella de longitud fija: el mismo texto siempre da la
 * misma huella, pero a partir de la huella NO se puede recuperar el texto.
 * Por eso guardamos el hash y nunca la contraseña.
 *
 * Usamos `crypto.subtle`, que ya viene en el navegador (no hay que instalar
 * nada). Es asíncrono (devuelve una Promise), por eso la función es `async`.
 * Ojo: `crypto.subtle` solo funciona en `localhost` o en sitios `https://`.
 *
 * AVISO: esto sirve para aprender. En una app real el SERVIDOR debe hashear
 * la contraseña con un algoritmo lento y con "sal" (bcrypt o Argon2).
 */
export async function sha256(text: string): Promise<string> {
  // 1) Convertimos el texto a bytes (UTF-8).
  const bytes: Uint8Array = new TextEncoder().encode(text);
  // 2) Calculamos el hash; el resultado es un ArrayBuffer de 32 bytes.
  const hashBuffer: ArrayBuffer = await crypto.subtle.digest('SHA-256', bytes as BufferSource);
  // 3) Pasamos cada byte a 2 caracteres hexadecimales y los unimos.
  return Array.from(new Uint8Array(hashBuffer))
    .map((b: number) => b.toString(16).padStart(2, '0'))
    .join('');
}
