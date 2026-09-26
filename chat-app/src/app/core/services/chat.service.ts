import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat, Message } from '../models';
import { MOCK_CHATS, MOCK_MESSAGES } from '../data/mock-chats';
import { environment } from '../../../environments/environment';

/**
 * ChatService: pide los chats y mensajes a la API (json-server) y los
 * comparte entre componentes.
 *
 * `providedIn: 'root'` significa que existe UNA sola instancia para toda la
 * app; así la lista, el encabezado y los mensajes ven los mismos datos.
 *
 * Un "signal" es una variable reactiva: cuando cambia su valor, Angular
 * vuelve a pintar automáticamente todo lo que la usa.
 *
 * Si la API está apagada, se muestra un aviso y se usan los datos
 * simulados (mock) para que la app siga funcionando.
 */
@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = environment.apiUrl;

  /** Lista de chats. `signal<Chat[]>` indica que guarda un arreglo de Chat. */
  readonly chats = signal<Chat[]>([]);
  /** Id del chat abierto; `null` significa "ninguno seleccionado" (así empieza). */
  readonly selectedChatId = signal<number | null>(null);
  /** true mientras se esperan los chats de la API. */
  readonly loading = signal<boolean>(false);
  /** Mensaje de error para mostrar en pantalla (o null si todo va bien). */
  readonly error = signal<string | null>(null);
  /** Todos los mensajes descargados (privado: solo este servicio lo modifica). */
  private readonly messages = signal<Message[]>([]);

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

  /** GET /chats — descarga la lista de chats. */
  loadChats(): void {
    this.loading.set(true);
    this.error.set(null);
    // `get<Chat[]>` le dice a TypeScript qué forma tendrá la respuesta.
    this.http.get<Chat[]>(`${this.apiUrl}/chats`).subscribe({
      next: (chats: Chat[]) => {
        this.chats.set(chats);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo conectar con la API. Mostrando datos de ejemplo.');
        this.chats.set(MOCK_CHATS);
        this.messages.set(MOCK_MESSAGES);
        this.loading.set(false);
      },
    });
  }

  /** Cambia el chat abierto y pide sus mensajes. `: void` = no devuelve nada. */
  selectChat(id: number): void {
    this.selectedChatId.set(id);
    this.loadMessages(id);
  }

  /** Cierra el chat abierto (botón "Volver" en teléfono). */
  closeChat(): void {
    this.selectedChatId.set(null);
  }

  /** GET /messages?chatId=1 — pide los mensajes de un chat. */
  private loadMessages(chatId: number): void {
    // Si estamos sin API (modo ejemplo), ya tenemos los mensajes en memoria.
    if (this.error() !== null) return;
    this.http.get<Message[]>(`${this.apiUrl}/messages`, { params: { chatId } }).subscribe({
      next: (list: Message[]) =>
        // Quitamos los viejos de ese chat y ponemos los que llegaron.
        this.messages.update((all: Message[]) => [...all.filter((m) => m.chatId !== chatId), ...list]),
      error: () => {
        this.error.set('No se pudieron cargar los mensajes. Mostrando datos de ejemplo.');
        this.messages.set(MOCK_MESSAGES);
      },
    });
  }

  /** Agrega un mensaje mío al chat abierto (ignora textos vacíos) y lo manda a la API. */
  sendMessage(text: string): void {
    const chatId: number | null = this.selectedChatId();
    const clean: string = text.trim();
    if (chatId === null || clean === '') return;

    // Omit<Message, 'id'>: un mensaje SIN id (el id lo pone el servidor).
    const draft: Omit<Message, 'id'> = {
      chatId,
      text: clean,
      sentAt: new Date().toISOString(),
      fromMe: true,
      status: 'sent',
    };
    // Lo mostramos al instante con un id temporal (actualización "optimista").
    const tempId: number = Date.now();
    this.messages.update((list: Message[]) => [...list, { ...draft, id: tempId }]);
    this.updateChatPreview(chatId, clean);

    if (this.error() !== null) return; // sin API no intentamos guardar
    this.http.post<Message>(`${this.apiUrl}/messages`, draft).subscribe({
      // Cuando responde, cambiamos el id temporal por el real.
      next: (saved: Message) =>
        this.messages.update((list: Message[]) => list.map((m) => (m.id === tempId ? saved : m))),
      error: () => this.error.set('No se pudo guardar el mensaje en la API.'),
    });
  }

  /** Actualiza el último mensaje que se ve en la lista lateral. */
  private updateChatPreview(chatId: number, text: string): void {
    const time: string = new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' });
    this.chats.update((list: Chat[]) =>
      list.map((c: Chat) => (c.id === chatId ? { ...c, lastMessage: text, lastMessageTime: time } : c)),
    );
  }
}
