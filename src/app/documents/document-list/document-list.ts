import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentItemComponent } from '../document-item/document-item';
import { CommonModule } from '@angular/common';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  imports: [CommonModule, DocumentItemComponent],
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }

  onSelectedDocument(document: Document) {
    this.documentService.documentSelectedEvent.emit(document);
  }
}
