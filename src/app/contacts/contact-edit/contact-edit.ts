import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactItemComponent } from '../contact-item/contact-item';

@Component({
  selector: 'cms-contact-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ContactItemComponent],
  templateUrl: './contact-edit.html',
  styleUrl: './contact-edit.css',
})
export class ContactEditComponent implements OnInit {
  originalContact!: Contact;
  contact!: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (!id) {
        this.editMode = false;
        return;
      }

      const originalContact = this.contactService.getContact(id);
      if (!originalContact) {
        return;
      }

      this.editMode = true;
      this.originalContact = originalContact;
      this.contact = JSON.parse(JSON.stringify(originalContact));

      if (this.contact.group) {
        this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact: Contact = {
      id: '',
      name: value.name,
      email: value.email,
      phone: value.phone || '',
      imageUrl: value.imageUrl || '',
      group: this.groupContacts.length > 0 ? this.groupContacts : null
    };

    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }
}
