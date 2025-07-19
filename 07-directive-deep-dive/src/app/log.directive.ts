import { Directive, ElementRef, inject } from '@angular/core';

@Directive( {
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'onClick()'
  }
} )
export class LogDirective {
  private hostElement = inject( ElementRef );

  onClick() {
    console.log( 'Element clicked!' );
    console.log( 'Element details:', this.hostElement.nativeElement );
  }

}
