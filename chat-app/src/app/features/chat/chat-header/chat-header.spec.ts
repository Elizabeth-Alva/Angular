import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ChatHeader } from './chat-header';

describe('ChatHeader', () => {
  let component: ChatHeader;
  let fixture: ComponentFixture<ChatHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatHeader],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
