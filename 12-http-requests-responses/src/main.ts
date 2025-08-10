import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';

function loggingInterceptor( request: HttpRequest<unknown>, next: HttpHandlerFn ) {
  const clonedRequest = request.clone({
    headers: request.headers.set( 'X-DEBUG', 'TESTING' ),
  });
  console.log( 'HTTP Request:', clonedRequest );
  return next( clonedRequest );
}

bootstrapApplication( AppComponent, {
  providers: [ provideHttpClient( withInterceptors( [ loggingInterceptor ] ) ) ]
} ).catch( ( err ) => console.error( err ) );
