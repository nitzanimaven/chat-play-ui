import { Component } from '@angular/core';
import { io } from 'socket.io-client';

interface ChatMessage {
  user: string;
  message: string;
  response: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  message = "test";
  chatLog: ChatMessage[] = [];
   socket = io('https://chat-playground.onrender.com');
  //socket = io('http://localhost:3000');
  key: string = "";

  constructor() {
    this.socket.on('status', (message: string) => {
      this.chatLog.push({ user: '', message, response: '' });
    });
    // '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'
    this.socket.on('chat', (message: ChatMessage) => {
      this.chatLog.push(message);
    });
  }

  sendMessage() {
    if (this.message.trim() !== '') {
      this.socket.emit('chat', { message: this.message, key: this.key });
      this.chatLog.push({ user: 'You', message: this.message, response: '' });
      this.message = '';
    }
  }
}
