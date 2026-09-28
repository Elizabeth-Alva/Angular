import { Component, inject, signal } from '@angular/core';
import { ChatService } from '../../../core/services/chat.service';

/** Caja de texto para escribir y enviar mensajes. */
@Component({
  selector: 'app-message-input',
  imports: [],
  templateUrl: './message-input.html',
  styleUrl: './message-input.scss',
})
export class MessageInput {
  private readonly chatService: ChatService = inject(ChatService);
  /** Lo que está escrito en el campo en este momento. */
  protected readonly text = signal<string>('');

  protected onInput(event: Event): void {
    this.text.set((event.target as HTMLInputElement).value);
  }

  /** Envía el mensaje y deja el campo vacío. */
  protected send(): void {
    this.chatService.sendMessage(this.text());
    this.text.set('');
  }
}
