import { Injectable, computed, signal } from '@angular/core';
import { Chat, Message } from '../models';
import { MOCK_CHATS, MOCK_MESSAGES } from '../data/mock-chats';

/**
 * ChatService: guarda los chats y mensajes y los comparte entre componentes.
 *
 * `providedIn: 'root'` significa que existe UNA sola instancia para toda la
 * app; así la lista, el encabezado y los mensajes ven los mismos datos.
 *
 * Un "signal" es una variable reactiva: cuando cambia su valor, Angular
 * vuelve a pintar automáticamente todo lo que la usa.
 */
@Injectable({ providedIn: 'root' })
export class ChatService {
  /** Lista de chats. `signal<Chat[]>` indica que guarda un arreglo de Chat. */
  readonly chats = signal<Chat[]>(MOCK_CHATS);
  /** Id del chat abierto; `null` significa "ninguno seleccionado" (así empieza). */
  readonly selectedChatId = signal<number | null>(null);
  /** Todos los mensajes (privado: solo este servicio lo modifica). */
  private readonly messages = signal<Message[]>(MOCK_MESSAGES);

  /**
   * `computed` crea un valor derivado de otros signals.
   * Se recalcula solo cuando cambian `chats` o `selectedChatId`.
   */
  readonly selectedChat = computed<Chat | undefined>(() =>
    this.chats().find((c: Chat) => c.id === this.selectedChatId()),
  );

  /** Solo los mensajes del chat seleccionado. */
  readonly selectedMessages = computed<Message[]>(() =>
    this.messages().filter((m: Message) => m.chatId === this.selectedChatId()),
  );

  /** Cambia el chat abierto. `: void` indica que la función no devuelve nada. */
  selectChat(id: number): void {
    this.selectedChatId.set(id);
  }

  /** Cierra el chat abierto (botón "Volver" en teléfono). */
  closeChat(): void {
    this.selectedChatId.set(null);
  }

  /** Agrega un mensaje mío al chat abierto (ignora textos vacíos). */
  sendMessage(text: string): void {
    const chatId: number | null = this.selectedChatId();
    const clean: string = text.trim();
    if (chatId === null || clean === '') return;

    const newMessage: Message = {
      id: Date.now(),
      chatId,
      text: clean,
      sentAt: new Date().toISOString(),
      fromMe: true,
      status: 'sent',
    };
    // `update` recibe el valor anterior y devuelve el nuevo.
    // Creamos un arreglo NUEVO (con ...) en vez de modificar el viejo.
    this.messages.update((list: Message[]) => [...list, newMessage]);
    this.updateChatPreview(chatId, clean);
  }

  /** Actualiza el último mensaje que se ve en la lista lateral. */
  private updateChatPreview(chatId: number, text: string): void {
    const time: string = new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' });
    this.chats.update((list: Chat[]) =>
      list.map((c: Chat) => (c.id === chatId ? { ...c, lastMessage: text, lastMessageTime: time } : c)),
    );
  }
}
