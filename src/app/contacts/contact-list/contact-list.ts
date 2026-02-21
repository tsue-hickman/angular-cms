import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { CommonModule } from '@angular/common';
import { ContactItemComponent } from '../contact-item/contact-item';
import { ContactService } from '../contact.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cms-contact-list',
  imports: [CommonModule, ContactItemComponent, RouterModule],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
  }
}
