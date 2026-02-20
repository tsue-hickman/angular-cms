import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cms-document-detail',
  imports: [],
  templateUrl: './document-detail.html',
  styleUrl: './document-detail.css',
})
export class DocumentDetailComponent implements OnInit {
  document!: Document;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      const doc = this.documentService.getDocument(id);
      if (doc) {
        this.document = doc;
      }
    });
  }
}
