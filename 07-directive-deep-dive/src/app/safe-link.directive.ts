import { Directive, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onClick($event)',
  },
})
export class SafeLinkDirective {
  sourceParam = input('myApp');

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
    const address = (event.target as HTMLAnchorElement).href;
    (event.target as HTMLAnchorElement).href =
      address + '?from=' + this.sourceParam();
  }
}
