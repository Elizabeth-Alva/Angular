import { Component, Signal, inject } from '@angular/core';
import { Chat } from '../../../core/models';
import { ChatService } from '../../../core/services/chat.service';
import { Avatar } from '../../../shared/components/avatar/avatar';

/** Encabezado con el nombre y estado del chat abierto. */
@Component({
  selector: 'app-chat-header',
  imports: [Avatar],
  templateUrl: './chat-header.html',
  styleUrl: './chat-header.scss',
})
export class ChatHeader {
  private readonly chatService: ChatService = inject(ChatService);
  /** El chat seleccionado (o undefined si no hay ninguno). */
  protected readonly chat: Signal<Chat | undefined> = this.chatService.selectedChat;
}
