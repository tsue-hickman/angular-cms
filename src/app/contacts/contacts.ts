import { Component } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cms-contacts',
  imports: [ContactListComponent, RouterModule],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class ContactsComponent {}
