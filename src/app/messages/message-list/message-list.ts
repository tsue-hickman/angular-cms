import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageItemComponent } from '../message-item/message-item';
import { MessageEditComponent } from '../message-edit/message-edit';
import { CommonModule } from '@angular/common';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-list',
  imports: [CommonModule, MessageItemComponent, MessageEditComponent],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  subscription!: Subscription;

  constructor(
    private messageService: MessageService,
    private cdr: ChangeDetectorRef  
  ) {}

  ngOnInit() {
    this.messageService.getMessages();
    
    this.subscription = this.messageService.messageChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.cdr.detectChanges();  
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}