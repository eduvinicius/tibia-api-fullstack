import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appCheckClickElement]',
  standalone: true
})
export class CheckClickElementDirective {

  @Output() clickOutside = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit(false);
      return;
    }
    this.clickOutside.emit(true);
  }

}
