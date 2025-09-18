import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component( {
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
} )
export class App {
  list = [ 'Milk', 'Sugar', 'Bread' ];

  onAdd( item: string ) {
    this.list.push( item );
  }

  onDelete( item: string ) {
    const index = this.list.indexOf( item );
    if ( index > -1 ) {
      this.list.splice( index, 1 );
    }
  }
}
