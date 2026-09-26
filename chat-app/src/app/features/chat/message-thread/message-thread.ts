import { Component, Signal, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Message } from '../../../core/models';
import { ChatService } from '../../../core/services/chat.service';

/** Lista de burbujas de mensajes del chat abierto. */
@Component({
  selector: 'app-message-thread',
  // DatePipe permite formatear fechas en el HTML: {{ fecha | date:'HH:mm' }}
  imports: [DatePipe],
  templateUrl: './message-thread.html',
  styleUrl: './message-thread.scss',
})
export class MessageThread {
  private readonly chatService: ChatService = inject(ChatService);
  protected readonly messages: Signal<Message[]> = this.chatService.selectedMessages;
}
