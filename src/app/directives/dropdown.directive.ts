import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[cmsDropdown]'
})
export class DropdownDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('click') toggleOpen() {
    const dropdown = this.elementRef.nativeElement.querySelector('.dropdown-menu');
    if (dropdown) {
      const isOpen = dropdown.classList.contains('show');
      if (isOpen) {
        dropdown.classList.remove('show');
      } else {
        dropdown.classList.add('show');
      }
    }
  }

  @HostListener('document:click', ['$event']) clickOutside(event: Event) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    const dropdown = this.elementRef.nativeElement.querySelector('.dropdown-menu');

    if (!clickedInside && dropdown && dropdown.classList.contains('show')) {
      dropdown.classList.remove('show');
    }
  }
}
