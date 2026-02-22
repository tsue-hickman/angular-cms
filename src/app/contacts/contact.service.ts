import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number = 0;

  constructor(private http: HttpClient) {
    this.getContacts();
  }

  getContacts() {
    this.http
      .get<Contact[]>('https://cms-tsue-default-rtdb.firebaseio.com/contacts.json')
      .subscribe(
        (contacts: Contact[]) => {
          // Handle null/undefined response
          if (!contacts) {
            this.contacts = [];
            return;
          }

          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.log('Error fetching contacts:', error);
        }
      );
  }

  storeContacts() {
    const contactsString = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put('https://cms-tsue-default-rtdb.firebaseio.com/contacts.json', contactsString, { headers })
      .subscribe(() => {
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }

  getContact(id: string): Contact | null {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }
}
