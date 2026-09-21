import { Component } from '@angular/core';
import { ChatList } from '../chat-list/chat-list';
import { ChatHeader } from '../chat-header/chat-header';
import { MessageThread } from '../message-thread/message-thread';
import { MessageInput } from '../message-input/message-input';

@Component({
  selector: 'app-app-shell',
  standalone: true,
  imports: [ChatList, ChatHeader, MessageThread, MessageInput],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss'
})
export class AppShellComponent {}