import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageItemComponent } from '../message-item/message-item';
import { MessageEditComponent } from '../message-edit/message-edit';
import { CommonModule } from '@angular/common';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  imports: [CommonModule, MessageItemComponent, MessageEditComponent],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
  }
}
