import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, throwError } from "rxjs";

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable( { providedIn: 'root' } )
export class AuthService {
  private httpClient = inject( HttpClient );

  signUp( email: string, password: string ) {
    return this.httpClient.post<AuthResponseData>( 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_pywh7u10Zq34nD30SVKITxeGEV1Q7vk', {
      email: email,
      password: password,
      returnSecureToken: true
    } ).pipe( catchError( ( errorRes ) => {
      console.error( errorRes );
      let errorMessage = 'An unknown error occurred!';
      if ( !errorRes.error || !errorRes.error.error ) {
        return throwError( () => errorMessage );
      }
      switch ( errorRes.error.error.message ) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already';
          break;
        default:
          errorMessage = errorRes.error.error.message;
      }
      return throwError( () => errorMessage );
    } ) );
  }
}