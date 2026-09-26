import { Component } from '@angular/core';
import { ChatList } from '../chat-list/chat-list';
import { ChatHeader } from '../chat-header/chat-header';
import { MessageThread } from '../message-thread/message-thread';
import { MessageInput } from '../message-input/message-input';

/**
 * ChatPage: "la página del chat" (antes se llamaba AppShellComponent).
 *
 * No tiene lógica propia: solo acomoda las 4 piezas del chat
 * (lista, encabezado, mensajes y caja de texto). A esto se le llama
 * un componente "contenedor" o de "layout".
 */
@Component({
  selector: 'app-chat-page',
  // En Angular moderno los componentes son "standalone": cada uno declara
  // aquí los otros componentes que usa en su HTML.
  imports: [ChatList, ChatHeader, MessageThread, MessageInput],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.scss',
})
export class ChatPage {}
