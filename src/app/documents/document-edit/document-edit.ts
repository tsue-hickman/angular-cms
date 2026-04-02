import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-document-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './document-edit.html',
  styleUrl: './document-edit.css',
})
export class DocumentEditComponent implements OnInit {
  originalDocument!: Document;
  document!: Document;
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (!id) {
        this.editMode = false;
        return;
      }

      const originalDoc = this.documentService.getDocument(id);
      if (!originalDoc) {
        return;
      }

      this.editMode = true;
      this.originalDocument = originalDoc;
      this.document = JSON.parse(JSON.stringify(originalDoc));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument: Document = new Document(
      '',
      '',
      value.name,
      value.description || '',
      value.url,
      null
    );

    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }
}
