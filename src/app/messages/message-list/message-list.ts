import { Component } from '@angular/core';
import { Message } from '../message.model';
import { MessageItemComponent } from '../message-item/message-item';
import { MessageEditComponent } from '../message-edit/message-edit';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-message-list',
  imports: [CommonModule, MessageItemComponent, MessageEditComponent],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageListComponent {
  messages: Message[] = [
    new Message('1', 'Meeting Tomorrow', 'Don\'t forget about our meeting tomorrow at 10 AM', 'John Doe'),
    new Message('2', 'Project Update', 'The project is progressing well. We should be done by Friday.', 'Jane Smith'),
    new Message('3', 'Lunch Plans', 'Want to grab lunch this week? Let me know when you\'re free.', 'Bob Johnson')
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
