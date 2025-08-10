import { Injectable, inject, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { Place } from './place.model';
import { ErrorService } from '../shared/shared/error.service';

@Injectable( {
  providedIn: 'root',
} )
export class PlacesService {
  private httpClient = inject( HttpClient );
  private userPlaces = signal<Place[]>( [] );
  private errorService = inject( ErrorService );

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces( 'http://localhost:3000/places' );
  }

  loadUserPlaces() {
    return this.fetchPlaces( 'http://localhost:3000/user-places' )
      .pipe( tap( {
        next: ( places ) => {
          this.userPlaces.set( places || [] );
        }
      } ) );
  }

  addPlaceToUserPlaces( place: Place ) {
    return this.httpClient.put<{ userPlaces: Place[] }>( 'http://localhost:3000/user-places/', {
      placeId: place.id,
    } )
      .pipe( tap( {
        next: ( response ) => {
          this.userPlaces.set( response.userPlaces || [] );
        }
      } ) )
      .pipe( catchError( ( error ) => {
        this.errorService.showError( 'Failed to add place to user places' );
        return throwError( () => new Error( 'Failed to add place to user places: ' + error.message ) );
      } ) );
  }

  removeUserPlace( place: Place ) { }

  private fetchPlaces( url: string ) {
    return this.httpClient
      .get<{ places: Place[] }>( url, {
        observe: 'response',
      } )
      .pipe(
        map( ( response ) => response.body?.places )
      );
  }
}
