import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageThread } from './message-thread';

describe('MessageThread', () => {
  let component: MessageThread;
  let fixture: ComponentFixture<MessageThread>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageThread],
      // HttpClient de prueba: no hace peticiones reales a la red.
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageThread);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
