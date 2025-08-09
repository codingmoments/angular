import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { PlacesService } from '../places.service';

@Component( {
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [ PlacesComponent, PlacesContainerComponent ],
} )
export class AvailablePlacesComponent implements OnInit {
  private destroyRef = inject( DestroyRef );
  private placesService = inject( PlacesService );

  places = signal<Place[] | undefined>( undefined );
  isFetching = signal( false );
  error = signal<string | undefined>( undefined );

  ngOnInit() {
    this.isFetching.set( true );

    const subscription = this.placesService.loadAvailablePlaces()
      .subscribe( {
        next: ( places ) => {
          this.places.set( places );
        },
        error: ( err ) => {
          console.error( 'Error fetching places:', err );
          this.error.set( 'Something went wrong while fetching places!' );
        },
        complete: () => {
          this.isFetching.set( false );
        }
      } );

    this.destroyRef.onDestroy( () => {
      subscription.unsubscribe();
    } );
  }

  onSelectPlace( onSelectPlace: Place ) {
    const subscription = this.placesService.addPlaceToUserPlaces( onSelectPlace ).subscribe( {
      next: ( responseData ) => {
        console.log( 'Place selected successfully:', responseData );
      }
    } );

    this.destroyRef.onDestroy( () => {
      subscription.unsubscribe();
    } );
  }
}
