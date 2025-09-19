import { afterNextRender, AfterViewInit, Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component( {
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
} )
export class App implements AfterViewInit {
  divState = 'normal';
  shrunken = false;
  pageLoaded = signal( false );

  list = [ 'Milk', 'Sugar', 'Bread' ];

  ngAfterViewInit(): void {
    this.pageLoaded.set( true );
  }

  onAdd( item: string ) {
    this.list.push( item );
  }

  onDelete( item: string ) {
    const index = this.list.indexOf( item );
    if ( index > -1 ) {
      this.list.splice( index, 1 );
    }
  }

  onAnimate() {
    this.divState = this.divState === 'normal' ? 'highlighted' : 'normal';
  }

  onShrink() {
    this.shrunken = !this.shrunken;
  }
}
