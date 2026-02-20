import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  imports: [RouterModule],
  templateUrl: './document-detail.html',
  styleUrl: './document-detail.css',
})
export class DocumentDetailComponent implements OnInit {
  document!: Document;
  nativeWindow: any;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private windRefService: WindRefService
  ) {}

  ngOnInit() {
    this.nativeWindow = this.windRefService.getNativeWindow();

    this.route.params.subscribe((params) => {
      const id = params['id'];
      const doc = this.documentService.getDocument(id);
      if (doc) {
        this.document = doc;
      }
    });
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }
}
