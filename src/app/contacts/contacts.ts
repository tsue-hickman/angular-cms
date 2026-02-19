import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ContactListComponent } from './contact-list/contact-list';
import { ContactDetailComponent } from './contact-detail/contact-detail';
import { CommonModule } from '@angular/common';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  imports: [CommonModule, ContactListComponent, ContactDetailComponent],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class ContactsComponent implements OnInit {
  selectedContact!: Contact;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.contactSelectedEvent.subscribe(
      (contact: Contact) => {
        this.selectedContact = contact;
      }
    );
  }
}
