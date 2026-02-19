import { Component, OnInit } from '@angular/core';
import { Document } from './document.model';
import { DocumentListComponent } from './document-list/document-list';
import { DocumentDetailComponent } from './document-detail/document-detail';
import { CommonModule } from '@angular/common';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  imports: [CommonModule, DocumentListComponent, DocumentDetailComponent],
  templateUrl: './documents.html',
  styleUrl: './documents.css',
})
export class DocumentsComponent implements OnInit {
  selectedDocument!: Document;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documentService.documentSelectedEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    );
  }
}
