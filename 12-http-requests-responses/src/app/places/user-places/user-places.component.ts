import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { PlacesService } from '../places.service';

@Component( {
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [ PlacesContainerComponent, PlacesComponent ],
} )
export class UserPlacesComponent implements OnInit {
  private destroyRef = inject( DestroyRef );
  private placesService = inject( PlacesService );

  places = this.placesService.loadedUserPlaces;
  isFetching = signal( false );
  error = signal<string | undefined>( undefined );

  ngOnInit() {
    this.isFetching.set( true );

    const subscription = this.placesService.loadUserPlaces()
      .subscribe( {
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

  removePlace( place: Place ) {
    this.placesService.removeUserPlace( place )
      .subscribe( {
        error: ( err ) => {
          console.error( 'Error removing place:', err );
          this.error.set( 'Something went wrong while removing the place!' );
        }
      } );
  }
}
