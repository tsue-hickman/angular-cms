import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { provideRouter } from '@angular/router';
import { DocumentsComponent } from './app/documents/documents';
import { MessageListComponent } from './app/messages/message-list/message-list';
import { ContactsComponent } from './app/contacts/contacts';
import { DocumentDetailComponent } from './app/documents/document-detail/document-detail';
import { DocumentEditComponent } from './app/documents/document-edit/document-edit';
import { ContactDetailComponent } from './app/contacts/contact-detail/contact-detail';
import { ContactEditComponent } from './app/contacts/contact-edit/contact-edit';

const routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  {
    path: 'documents',
    component: DocumentsComponent,
    children: [
      { path: 'new', component: DocumentEditComponent },
      { path: ':id', component: DocumentDetailComponent },
      { path: ':id/edit', component: DocumentEditComponent }
    ]
  },
  { path: 'messages', component: MessageListComponent },
  {
    path: 'contacts',
    component: ContactsComponent,
    children: [
      { path: 'new', component: ContactEditComponent },
      { path: ':id', component: ContactDetailComponent },
      { path: ':id/edit', component: ContactEditComponent }
    ]
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
}).catch((err) => console.error(err));
