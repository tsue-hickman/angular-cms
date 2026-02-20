import { Component } from '@angular/core';
import { DocumentListComponent } from './document-list/document-list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cms-documents',
  imports: [DocumentListComponent, RouterModule],
  templateUrl: './documents.html',
  styleUrl: './documents.css',
})
export class DocumentsComponent {}
