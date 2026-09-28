/**
 * Tipo "unión": solo acepta EXACTAMENTE una de estas tres palabras.
 * Si alguien escribe 'leido', TypeScript marca error.
 */
export type MessageStatus = 'sent' | 'delivered' | 'read';

/** Un mensaje dentro de una conversación. */
export interface Message {
  id: number;
  /** A qué chat pertenece (relaciona Message con Chat.id). */
  chatId: number;
  text: string;
  /** Fecha en formato ISO, por ejemplo '2026-09-26T12:40:00'. */
  sentAt: string;
  /** true si lo envié yo (burbuja a la derecha). */
  fromMe: boolean;
  status: MessageStatus;
}

/** Una conversación de la lista lateral. */
export interface Chat {
  id: number;
  name: string;
  initials: string;
  avatarColor: number;
  online: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}
