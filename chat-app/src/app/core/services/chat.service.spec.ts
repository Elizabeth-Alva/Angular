import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ChatService } from './chat.service';
import { MOCK_CHATS, MOCK_MESSAGES } from '../data/mock-chats';

describe('ChatService', () => {
  let service: ChatService;
  let http: HttpTestingController;

  beforeEach(() => {
    // provideHttpClientTesting reemplaza la red por un "servidor falso" que controlamos.
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(ChatService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify()); // comprueba que no quedaron peticiones sin responder

  /** Carga chats y abre el chat 1 respondiendo con los datos de ejemplo. */
  function cargarYAbrir(): void {
    service.loadChats();
    http.expectOne((r) => r.url.endsWith('/chats')).flush(MOCK_CHATS);
    service.selectChat(1);
    http
      .expectOne((r) => r.url.endsWith('/messages') && r.params.get('chatId') === '1')
      .flush(MOCK_MESSAGES.filter((m) => m.chatId === 1));
  }

  it('empieza sin chat seleccionado', () => {
    expect(service.selectedChat()).toBeUndefined();
    expect(service.selectedMessages().length).toBe(0);
  });

  it('carga chats desde la API y abre un chat', () => {
    cargarYAbrir();
    expect(service.chats().length).toBe(MOCK_CHATS.length);
    expect(service.selectedChat()?.name).toBe('Ana Torres');
    expect(service.selectedMessages().length).toBe(4);
    service.closeChat();
    expect(service.selectedChat()).toBeUndefined();
  });

  it('si la API falla usa datos de ejemplo y muestra un error', () => {
    service.loadChats();
    http.expectOne((r) => r.url.endsWith('/chats')).error(new ProgressEvent('error'));
    expect(service.error()).not.toBeNull();
    expect(service.chats().length).toBe(MOCK_CHATS.length);
    service.selectChat(3); // sin API no pide mensajes
    expect(service.selectedChat()?.name).toBe('Luis Ramírez');
  });

  it('no envía si no hay chat abierto', () => {
    service.sendMessage('Hola');
    expect(service.selectedMessages().length).toBe(0);
  });

  it('envía un mensaje (POST) y actualiza la vista previa', () => {
    cargarYAbrir();
    const antes: number = service.selectedMessages().length;
    service.sendMessage('  Hola  ');
    expect(service.selectedMessages().length).toBe(antes + 1);
    expect(service.selectedChat()?.lastMessage).toBe('Hola');

    const req = http.expectOne((r) => r.method === 'POST');
    expect(req.request.body.text).toBe('Hola');
    req.flush({ ...req.request.body, id: 99 });
    expect(service.selectedMessages().some((m) => m.id === 99)).toBe(true);
  });

  it('ignora mensajes vacíos', () => {
    cargarYAbrir();
    const antes: number = service.selectedMessages().length;
    service.sendMessage('   ');
    expect(service.selectedMessages().length).toBe(antes);
  });
});
