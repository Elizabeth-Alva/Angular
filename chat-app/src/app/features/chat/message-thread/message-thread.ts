import { Component, ElementRef, Signal, effect, inject, viewChild } from '@angular/core';
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

  /** Referencia al <div #scroller> del HTML. */
  private readonly scroller = viewChild<ElementRef<HTMLElement>>('scroller');

  constructor() {
    // effect() se vuelve a ejecutar cada vez que cambian los signals que lee.
    // Aquí: cuando cambian los mensajes, bajamos hasta el último.
    effect(() => {
      this.messages(); // "leemos" el signal para que el effect lo vigile
      const el: HTMLElement | undefined = this.scroller()?.nativeElement;
      if (el) {
        // Esperamos a que Angular pinte el mensaje nuevo antes de bajar.
        queueMicrotask(() => (el.scrollTop = el.scrollHeight));
      }
    });
  }
}
