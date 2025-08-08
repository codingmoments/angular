import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component( {
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [ PlacesContainerComponent, PlacesComponent ],
} )
export class UserPlacesComponent implements OnInit {
  private httpClient = inject( HttpClient );
  private destroyRef = inject( DestroyRef );

  places = signal<Place[] | undefined>( undefined );
  isFetching = signal( false );
  error = signal<string | undefined>( undefined );

  ngOnInit() {
    this.isFetching.set( true );

    const subscription = this.httpClient
      .get<{ places: Place[] }>( 'http://localhost:3000/user-places', {
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
          this.error.set( 'Something went wrong while fetching favorite places!' );
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
