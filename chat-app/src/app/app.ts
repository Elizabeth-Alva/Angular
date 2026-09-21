import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell';

@Component({
  selector: 'app-root',
  imports: [AppShellComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('chat-app');
}
