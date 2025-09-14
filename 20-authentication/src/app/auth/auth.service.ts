import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable( { providedIn: 'root' } )
export class AuthService {
  private httpClient = inject( HttpClient );
  user?: User;

  signUp( email: string, password: string ) {
    return this.httpClient.post<AuthResponseData>( 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_pywh7u10Zq34nD30SVKITxeGEV1Q7vk', {
      email: email,
      password: password,
      returnSecureToken: true
    } ).pipe(
      catchError( this.handleError ),
      tap( resData => {
        this.handleSuccessfulAuthentication( resData.email, resData.localId, resData.idToken, +resData.expiresIn );
      } )
    );
  }

  signIn( email: string, password: string ) {
    return this.httpClient.post<AuthResponseData>( 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC_pywh7u10Zq34nD30SVKITxeGEV1Q7vk', {
      email: email,
      password: password,
      returnSecureToken: true
    } ).pipe(
      catchError( this.handleError ),
      tap( resData => {
        this.handleSuccessfulAuthentication( resData.email, resData.localId, resData.idToken, +resData.expiresIn );
      } )
    );
  }

  private handleSuccessfulAuthentication( email: string, userId: string, token: string, expiresIn: number ) {
    // const expirationDate = new Date( new Date().getTime() + expiresIn * 1000 );
    const expirationDate = new Date( new Date().getTime() + 30 * 1000 );
    this.user = new User( userId, email, token, expirationDate );
    window.localStorage.setItem( 'userData', JSON.stringify( this.user ) );
  }

  private handleError( errorRes: HttpErrorResponse ) {
    console.error( errorRes );
    let errorMessage = 'An unknown error occurred!';
    if ( !errorRes.error || !errorRes.error.error ) {
      return throwError( () => errorMessage );
    }
    switch ( errorRes.error.error.message ) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'This email or password is not correct.';
        break;
      default:
        errorMessage = errorRes.error.error.message;
    }
    return throwError( () => errorMessage );
  }
}