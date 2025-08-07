import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs';

@Component( {
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [ PlacesComponent, PlacesContainerComponent ],
} )
export class AvailablePlacesComponent implements OnInit {
  private httpClient = inject( HttpClient );
  private destroyRef = inject( DestroyRef );

  places = signal<Place[] | undefined>( undefined );
  isFetching = signal( false );
  error = signal<string | undefined>( undefined );

  ngOnInit() {
    this.isFetching.set( true );

    const subscription = this.httpClient
      .get<{ places: Place[] }>( 'http://localhost:3000/places', {
        observe: 'response',
      } )
      .pipe(
        map( ( response ) => response.body?.places )
      )
      .subscribe( {
        next: ( places ) => {
          this.places.set( places );
        },
        error: ( err ) => {
          console.error( 'Error fetching places:', err );
          this.error.set('Something went wrong while fetching places!');
        },
        complete: () => {
          this.isFetching.set( false );
        }
      } );

    this.destroyRef.onDestroy( () => {
      subscription.unsubscribe();
    } );
  }
}
