import { Component, computed, inject, signal } from '@angular/core';
import { Chat } from '../../../core/models';
import { ChatService } from '../../../core/services/chat.service';
import { Avatar } from '../../../shared/components/avatar/avatar';

/** Barra lateral con el buscador y la lista de conversaciones. */
@Component({
  selector: 'app-chat-list',
  imports: [Avatar],
  templateUrl: './chat-list.html',
  styleUrl: './chat-list.scss',
})
export class ChatList {
  // `inject()` pide a Angular la instancia compartida del servicio.
  private readonly chatService: ChatService = inject(ChatService);

  /** Texto que la persona escribe en el buscador. */
  protected readonly search = signal<string>('');
  /** Id del chat abierto (para pintarlo como "activo"). */
  protected readonly selectedId = this.chatService.selectedChatId;

  /** Chats cuyo nombre contiene el texto buscado (sin importar mayúsculas). */
  protected readonly filteredChats = computed<Chat[]>(() => {
    const term: string = this.search().trim().toLowerCase();
    return this.chatService.chats().filter((c: Chat) => c.name.toLowerCase().includes(term));
  });

  /** Se ejecuta en cada tecla del buscador. */
  protected onSearch(event: Event): void {
    // `as HTMLInputElement` le dice a TypeScript qué tipo de elemento es.
    this.search.set((event.target as HTMLInputElement).value);
  }

  protected select(id: number): void {
    this.chatService.selectChat(id);
  }
}
