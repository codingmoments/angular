import { Component, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

@Component( {
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: [ './counter-output.component.css' ],
  imports: [ AsyncPipe ],
  standalone: true,
} )
export class CounterOutputComponent {
  private store = inject( Store<{ counter: number }> );
  count$?: Observable<number>;

  constructor() {
    this.count$ = this.store?.select( state => state.counter );
  }
}
