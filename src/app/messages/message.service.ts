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

  constructor(private http: HttpClient) {
    this.getMessages();
  }

  getMessages() {
    this.http
      .get<any>('http://localhost:3000/messages')
      .subscribe(
        (responseData: any) => {
          this.messages = responseData.messages;
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log('Error fetching messages:', error);
        }
      );
  }

  getMessage(id: string): Message | null {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  sortAndSend() {
    this.messageChangedEvent.next(this.messages.slice());
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }

    message.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<any>(
      'http://localhost:3000/messages',
      message,
      { headers: headers }
    ).subscribe(
      (responseData: any) => {
        this.messages.push(responseData.message);
        this.sortAndSend();
      }
    );
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) {
      return;
    }

    const pos = this.messages.findIndex(m => m.id === originalMessage.id);

    if (pos < 0) {
      return;
    }

    newMessage.id = originalMessage.id;
    newMessage._id = originalMessage._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(
      'http://localhost:3000/messages/' + originalMessage.id,
      newMessage,
      { headers: headers }
    ).subscribe(
      (response: any) => {
        this.messages[pos] = newMessage;
        this.sortAndSend();
      }
    );
  }

  deleteMessage(message: Message) {
    if (!message) {
      return;
    }

    const pos = this.messages.findIndex(m => m.id === message.id);

    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/messages/' + message.id)
      .subscribe(
        (response: any) => {
          this.messages.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }
}
