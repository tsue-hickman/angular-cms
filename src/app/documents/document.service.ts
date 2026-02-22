import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number = 0;

  constructor(private http: HttpClient) {
    this.getDocuments();
  }

getDocuments() {
  this.http
    .get<Document[]>('https://cms-tsue-default-rtdb.firebaseio.com/documents.json')
    .subscribe(
      (documents: Document[]) => {
        // Handle null/undefined response
        if (!documents) {
          this.documents = [];
          return;
        }

        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error: any) => {
        console.log('Error fetching documents:', error);
      }
    );
}

  storeDocuments() {
    const documentsString = JSON.stringify(this.documents);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put('https://cms-tsue-default-rtdb.firebaseio.com/documents.json', documentsString, { headers })
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  getDocument(id: string): Document | null {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const document of this.documents) {
      const currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = String(this.maxDocumentId);
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }
}
