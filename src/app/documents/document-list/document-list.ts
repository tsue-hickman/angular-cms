import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentItemComponent } from '../document-item/document-item';
import { CommonModule } from '@angular/common';
import { DocumentService } from '../document.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cms-document-list',
  imports: [CommonModule, DocumentItemComponent, RouterModule],
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
  }
}
