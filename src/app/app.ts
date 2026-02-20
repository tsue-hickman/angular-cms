import { Component } from '@angular/core';
import { HeaderComponent } from './header';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cms-root',
  imports: [HeaderComponent, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'cms';
}
