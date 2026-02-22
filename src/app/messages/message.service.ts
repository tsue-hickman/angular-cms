import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new Subject<Message[]>();
  maxMessageId: number = 0;

  constructor(private http: HttpClient) {
    this.getMessages();
  }

  getMessages() {
    this.http
      .get<Message[]>('https://cms-tsue-default-rtdb.firebaseio.com/')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log('Error fetching messages:', error);
        }
      );
  }

  storeMessages() {
    const messagesString = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put('https://cms-tsue-default-rtdb.firebaseio.com/messages.json', messagesString, { headers })
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

  getMessage(id: string): Message | null {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }
    this.maxMessageId++;
    message.id = String(this.maxMessageId);
    this.messages.push(message);
    this.storeMessages();
  }
}
