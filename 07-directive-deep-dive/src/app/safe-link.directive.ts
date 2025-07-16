import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onClick($event)',
  },
})
export class SafeLinkDirective {
  appSafeLink = input('myApp');
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log('SafeLinkDirective is active!');
  }

  onClick(event: MouseEvent) {
    const wantsToLeave = window.confirm(
      'You are about to leave this site. Do you want to continue?'
    );
    if (!wantsToLeave) {
      event.preventDefault();
    }
    const address = this.hostElementRef.nativeElement.href;
    this.hostElementRef.nativeElement.href =
      address + '?from=' + this.appSafeLink();
  }
}
