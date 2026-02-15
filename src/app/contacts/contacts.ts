import { Component } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list';
import { ContactDetailComponent } from './contact-detail/contact-detail';
import { Contact } from './contact.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-contacts',
  imports: [CommonModule, ContactListComponent, ContactDetailComponent],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class ContactsComponent {
  selectedContact!: Contact;
}
