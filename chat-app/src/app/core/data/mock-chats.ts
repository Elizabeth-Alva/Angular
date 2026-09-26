import { Chat, Message } from '../models';

/**
 * Datos simulados ("mock"). Antes estaban escritos a mano dentro del HTML;
 * ahora son arreglos tipados con las interfaces. Si olvidas un campo
 * (por ejemplo `unreadCount`), el editor lo subraya en rojo.
 */
export const MOCK_CHATS: Chat[] = [
  { id: 1, name: 'Ana Torres', initials: 'AT', avatarColor: 1, online: true,
    lastMessage: 'Perfecto, nos vemos mañana entonces 👍', lastMessageTime: '12:45', unreadCount: 0 },
  { id: 2, name: 'Equipo Angular — Principios', initials: 'EQ', avatarColor: 2, online: false,
    lastMessage: 'Diego: ya subí mi parte del sidebar', lastMessageTime: '11:20', unreadCount: 3 },
  { id: 3, name: 'Luis Ramírez', initials: 'LR', avatarColor: 3, online: false,
    lastMessage: 'Te mando el enlace del repo', lastMessageTime: 'Ayer', unreadCount: 0 },
  { id: 4, name: 'Marta Pineda', initials: 'MP', avatarColor: 4, online: false,
    lastMessage: 'Ok, reviso el maquetado hoy en la tarde', lastMessageTime: 'Ayer', unreadCount: 0 },
  { id: 5, name: 'Carlos Gómez', initials: 'CG', avatarColor: 5, online: false,
    lastMessage: 'Vale, quedamos así', lastMessageTime: 'Lun', unreadCount: 0 },
  { id: 6, name: 'Sofía Vega', initials: 'SV', avatarColor: 6, online: false,
    lastMessage: 'Buenísimo el ejemplo de breakpoints', lastMessageTime: 'Lun', unreadCount: 0 },
];

export const MOCK_MESSAGES: Message[] = [
  { id: 1, chatId: 1, text: 'Hola, ¿cómo va el maquetado del chat?', sentAt: '2026-09-26T12:40:00', fromMe: false, status: 'read' },
  { id: 2, chatId: 1, text: 'Va bien, ya tengo el sidebar y las burbujas de mensaje listas', sentAt: '2026-09-26T12:42:00', fromMe: true, status: 'read' },
  { id: 3, chatId: 1, text: 'Falta probar reloj, auto y TV', sentAt: '2026-09-26T12:42:30', fromMe: true, status: 'read' },
  { id: 4, chatId: 1, text: 'Perfecto, nos vemos mañana entonces 👍', sentAt: '2026-09-26T12:45:00', fromMe: false, status: 'read' },
  { id: 5, chatId: 2, text: 'Diego: ya subí mi parte del sidebar', sentAt: '2026-09-26T11:20:00', fromMe: false, status: 'delivered' },
  { id: 6, chatId: 3, text: 'Te mando el enlace del repo', sentAt: '2026-09-25T18:10:00', fromMe: false, status: 'read' },
  { id: 7, chatId: 4, text: 'Ok, reviso el maquetado hoy en la tarde', sentAt: '2026-09-25T09:30:00', fromMe: false, status: 'read' },
  { id: 8, chatId: 5, text: 'Vale, quedamos así', sentAt: '2026-09-21T16:00:00', fromMe: false, status: 'read' },
  { id: 9, chatId: 6, text: 'Buenísimo el ejemplo de breakpoints', sentAt: '2026-09-21T10:15:00', fromMe: false, status: 'read' },
];
