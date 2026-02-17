import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-contact-item',
  imports: [CommonModule],
  templateUrl: './contact-item.html',
  styleUrl: './contact-item.css',
})
export class ContactItemComponent {
  @Input() contact!: Contact;
}
