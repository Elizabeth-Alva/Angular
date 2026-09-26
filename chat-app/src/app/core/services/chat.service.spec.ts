import { TestBed } from '@angular/core/testing';
import { ChatService } from './chat.service';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(() => {
    service = TestBed.inject(ChatService);
  });

  // Los tests de envío necesitan un chat abierto.
  function abrirChat(): void {
    service.selectChat(1);
  }

  it('empieza sin chat seleccionado', () => {
    expect(service.selectedChat()).toBeUndefined();
    expect(service.selectedMessages().length).toBe(0);
  });

  it('abre y cierra un chat', () => {
    service.selectChat(1);
    expect(service.selectedChat()?.name).toBe('Ana Torres');
    expect(service.selectedMessages().length).toBeGreaterThan(0);
    service.closeChat();
    expect(service.selectedChat()).toBeUndefined();
  });

  it('cambia de chat', () => {
    service.selectChat(3);
    expect(service.selectedChat()?.name).toBe('Luis Ramírez');
  });

  it('no envía si no hay chat abierto', () => {
    service.sendMessage('Hola');
    expect(service.selectedMessages().length).toBe(0);
  });

  it('envía un mensaje y actualiza la vista previa', () => {
    abrirChat();
    const antes: number = service.selectedMessages().length;
    service.sendMessage('  Hola  ');
    expect(service.selectedMessages().length).toBe(antes + 1);
    expect(service.selectedChat()?.lastMessage).toBe('Hola');
  });

  it('ignora mensajes vacíos', () => {
    abrirChat();
    const antes: number = service.selectedMessages().length;
    service.sendMessage('   ');
    expect(service.selectedMessages().length).toBe(antes);
  });
});
