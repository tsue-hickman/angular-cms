import { Component } from '@angular/core';
import { Document } from './document.model';
import { DocumentListComponent } from './document-list/document-list';
import { DocumentDetailComponent } from './document-detail/document-detail';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-documents',
  imports: [CommonModule, DocumentListComponent, DocumentDetailComponent],
  templateUrl: './documents.html',
  styleUrl: './documents.css',
})
export class DocumentsComponent {
  selectedDocument!: Document;
}
