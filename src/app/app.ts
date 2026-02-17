import { Component } from '@angular/core';
import { HeaderComponent } from './header';
import { ContactsComponent } from './contacts/contacts';
import { MessageListComponent } from './messages/message-list/message-list';
import { DocumentsComponent } from './documents/documents';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-root',
  imports: [CommonModule, HeaderComponent, ContactsComponent, MessageListComponent, DocumentsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'cms';
  selectedFeature = 'contacts';

  switchView(feature: string) {
    this.selectedFeature = feature;
  }
}
