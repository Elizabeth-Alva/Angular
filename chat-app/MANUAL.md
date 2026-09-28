# Manual de usuario — Chat App

## 1. Introducción

Chat App es una aplicación de mensajería. Con ella puedes iniciar sesión, ver tus conversaciones, buscar un chat, leer mensajes y enviar mensajes nuevos. Funciona en computadora, tablet, teléfono, TV, reloj y pantalla de auto.

## 2. Requisitos

- Un navegador actualizado: Chrome, Edge o Firefox.
- Para abrir la app en tu computadora: tener instalado [Node.js](https://nodejs.org/) (versión 20 o superior).

## 3. Cómo abrir la app

1. Abre una terminal dentro de la carpeta `chat-app/`.
2. Escribe `npm install` y presiona **Enter** (solo la primera vez).
3. Escribe `npm run api` y presiona **Enter**. Esto enciende la API de práctica (json-server) en `http://localhost:3000`. Deja esta terminal abierta.
4. Abre **otra** terminal en la misma carpeta.
5. Escribe `npm start` y presiona **Enter**.
6. Abre el navegador en `http://localhost:4200`.

> Si olvidas el paso 3, la app funciona igual con datos de ejemplo y muestra un aviso naranja arriba: "No se pudo conectar con la API".

## 4. Iniciar sesión

1. Escribe tu **usuario** en el primer campo.
2. Escribe tu **contraseña** en el segundo campo. Puedes presionar **Ver** para mostrarla y **Ocultar** para esconderla otra vez.
3. Deja marcada la casilla **Mantener sesión iniciada** si quieres que la app te recuerde por 30 días. Si la desmarcas, te recuerda solo 1 día.
4. Presiona **Entrar**.

Mensajes que pueden aparecer:

| Mensaje | Qué significa | Qué hacer |
|---|---|---|
| "Escribe tu usuario" / "Escribe tu contraseña" | Dejaste el campo vacío. | Llena el campo. |
| "Solo letras, números, punto o guion (3 a 20 caracteres)" | El usuario tiene espacios o símbolos. | Corrige el usuario. |
| "Mínimo 6 caracteres" | La contraseña es muy corta. | Revisa la contraseña. |
| "Usuario o contraseña incorrectos" | Los datos no coinciden. | Vuelve a escribirlos con cuidado. |

## 5. Pantalla de bienvenida

Justo después de iniciar sesión verás un saludo con tu nombre: **"¡Hola, Ele!"**.

1. Espera 3 segundos y pasarás al chat automáticamente, **o**
2. Presiona **Ir a mis chats** para pasar de inmediato.

La bienvenida solo aparece al iniciar sesión. Si recargas la página o vuelves a abrir la app, entras directo a tus chats.

## 6. Usar el chat

### Buscar un chat
1. Haz clic en el campo **Buscar o empezar un chat nuevo**.
2. Escribe parte del nombre. La lista se filtra mientras escribes.
3. Si nada coincide verás "No se encontraron chats".

### Abrir una conversación
1. Haz clic en un chat de la lista.
2. A la derecha (o en toda la pantalla, en teléfono) verás los mensajes.

### Leer los indicadores
- **Punto verde** junto al avatar: la persona está en línea.
- **Número naranja**: cantidad de mensajes sin leer.
- **✓**: tu mensaje fue enviado. **✓✓**: tu mensaje fue leído.

### Enviar un mensaje
1. Escribe en el campo **Escribe un mensaje** (abajo).
2. Presiona **Enter** o el botón de avión de papel.
3. El botón de enviar se ve apagado mientras el campo esté vacío.

## 7. Usar la app en distintos dispositivos

- **Computadora, tablet, auto y TV:** la lista de chats está a la izquierda y la conversación a la derecha.
- **Teléfono:** primero ves la lista. Al tocar un chat se abre en toda la pantalla; toca la flecha **←** (arriba a la izquierda) para volver a la lista.
- **TV:** usa las flechas del control (o la tecla **Tab**) para moverte y **Enter** para elegir.
- **Reloj:** se muestran solo los mensajes y el campo para escribir.

## 8. Cerrar sesión

1. Abre cualquier chat.
2. Presiona el botón **Cerrar sesión** (icono de puerta con flecha, arriba a la derecha).
3. Vuelves a la pantalla de inicio de sesión. Se borran la cookie `chat_token` y los datos guardados (`chat.session`).

## 9. Preguntas frecuentes

**¿Por qué sigo con la sesión abierta después de cerrar el navegador o detener `npm start`?**
Porque la sesión se guarda en tu navegador (una cookie y el "localStorage"), no en el programa. Así no tienes que escribir tu contraseña cada vez. Usa **Cerrar sesión** si quieres salir.

**Me sacó de la sesión sin que yo lo pidiera.**
La sesión caducó (1 día, o 30 días si marcaste "Mantener sesión iniciada"), o se borraron las cookies o los datos del navegador. Vuelve a iniciar sesión.

**No cargan los chats / aparece un aviso naranja.**
La API está apagada. Abre una terminal en `chat-app/` y ejecuta `npm run api`, luego recarga la página.

**¿Mis mensajes se guardan?**
Si la API está encendida, sí: se guardan en el archivo `api/db.json`. Si está apagada, solo duran hasta que recargues la página.

## 10. Datos de prueba

| Usuario | Contraseña |
|---|---|
| `ele` | `123456` |

La contraseña **no** está guardada en el código: solo se guarda su huella SHA-256.

## 11. Diseño en Figma

Todavía no existe un archivo de Figma. Cuando se cree (Punto 9 del plan), su enlace se agregará aquí.
