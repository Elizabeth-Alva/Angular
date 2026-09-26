import { TestBed } from '@angular/core/testing';
import { ChatService } from './chat.service';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(() => {
    service = TestBed.inject(ChatService);
  });

  it('empieza con el chat 1 seleccionado', () => {
    expect(service.selectedChat()?.name).toBe('Ana Torres');
    expect(service.selectedMessages().length).toBeGreaterThan(0);
  });

  it('cambia de chat', () => {
    service.selectChat(3);
    expect(service.selectedChat()?.name).toBe('Luis Ramírez');
  });

  it('envía un mensaje y actualiza la vista previa', () => {
    const antes: number = service.selectedMessages().length;
    service.sendMessage('  Hola  ');
    expect(service.selectedMessages().length).toBe(antes + 1);
    expect(service.selectedChat()?.lastMessage).toBe('Hola');
  });

  it('ignora mensajes vacíos', () => {
    const antes: number = service.selectedMessages().length;
    service.sendMessage('   ');
    expect(service.selectedMessages().length).toBe(antes);
  });
});
