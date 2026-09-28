import { Component, computed, inject } from '@angular/core';
import { ChatService } from '../../../core/services/chat.service';
import { ChatList } from '../chat-list/chat-list';
import { ChatHeader } from '../chat-header/chat-header';
import { MessageThread } from '../message-thread/message-thread';
import { MessageInput } from '../message-input/message-input';

/**
 * ChatPage: "la página del chat" (antes se llamaba AppShellComponent).
 *
 * Acomoda las 4 piezas del chat (lista, encabezado, mensajes y caja de texto).
 * En teléfono funciona como una "pila": se ve la lista O el chat abierto,
 * nunca los dos a la vez (lo controla la clase `app--chat-open`).
 */
@Component({
  selector: 'app-chat-page',
  // En Angular moderno los componentes son "standalone": cada uno declara
  // aquí los otros componentes que usa en su HTML.
  imports: [ChatList, ChatHeader, MessageThread, MessageInput],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.scss',
})
export class ChatPage {
  private readonly chatService: ChatService = inject(ChatService);
  /** true si hay un chat abierto. */
  /** Aviso de error de la API (o null). */
  protected readonly error = this.chatService.error;
  protected readonly loading = this.chatService.loading;

  constructor() {
    // Al abrir la página pedimos los chats a la API.
    this.chatService.loadChats();
  }

  protected readonly hasChat = computed<boolean>(() => this.chatService.selectedChat() !== undefined);
}
