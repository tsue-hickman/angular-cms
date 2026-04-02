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

  constructor(private http: HttpClient) {
    this.getDocuments();
  }

  getDocuments() {
    this.http
      .get<{ message: string, documents: Document[] }>('http://localhost:3000/documents')
      .subscribe(
        (responseData) => {
          this.documents = responseData.documents;
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

  getDocument(id: string): Document | null {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  sortAndSend() {
    this.documents.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    this.documentListChangedEvent.next(this.documents.slice());
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    document.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string, document: Document }>(
      'http://localhost:3000/documents',
      document,
      { headers: headers }
    ).subscribe(
      (responseData) => {
        this.documents.push(responseData.document);
        this.sortAndSend();
      }
    );
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(
      'http://localhost:3000/documents/' + originalDocument.id,
      newDocument,
      { headers: headers }
    ).subscribe(
      (response: any) => {
        this.documents[pos] = newDocument;
        this.sortAndSend();
      }
    );
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: any) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }
}
