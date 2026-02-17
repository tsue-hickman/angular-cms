import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cms-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  @Output() selectedFeatureEvent = new EventEmitter<string>();

  onSelected(feature: string) {
    this.selectedFeatureEvent.emit(feature);
  }
}
