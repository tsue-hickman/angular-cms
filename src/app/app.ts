import { Component } from '@angular/core';
import { HeaderComponent } from './header';
import { ContactsComponent } from './contacts/contacts';

@Component({
  selector: 'cms-root',
  imports: [HeaderComponent, ContactsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'cms';
}
