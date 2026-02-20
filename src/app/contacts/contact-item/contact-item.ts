import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cms-contact-item',
  imports: [RouterModule],
  templateUrl: './contact-item.html',
  styleUrl: './contact-item.css',
})
export class ContactItemComponent {
  @Input() contact!: Contact;
}
