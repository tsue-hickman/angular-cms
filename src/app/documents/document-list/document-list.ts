import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentItemComponent } from '../document-item/document-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-document-list',
  imports: [CommonModule, DocumentItemComponent],
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'CIT 425 - Data Warehousing', 'Study guide for final exam', 'https://rkjdatawarehousing.com', null),
    new Document('2', 'CIT 460 - Network Security', 'Network security final project', 'https://rkjnetsecurity.com', null),
    new Document('3', 'CIT 366 - Full Stack Development', 'Angular tutorial', 'https://angular.io/tutorial', null),
    new Document('4', 'CIT 240 - Intro to Networking', 'Favorite link article on Networking', 'https://www.cisco.com', null),
    new Document('5', 'CIT 370 - Computer Architecture', 'Quantum computing article', 'https://www.ibm.com/quantum', null)
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
