import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { filter } from 'rxjs';

import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { AuthComponent } from "./auth/auth.component";

@Component( {
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, UsersComponent, RouterOutlet, AuthComponent],
} )
export class AppComponent implements OnInit {
  private router = inject( Router );
  private destroyRef = inject( DestroyRef );

  isAuthRoute = false;

  ngOnInit(): void {
    // Check initial route
    this.checkAuthRoute();

    // Listen to all navigation events
    const subscription = this.router.events
      .pipe(
        filter( event => event instanceof NavigationEnd )
      )
      .subscribe( () => {
        this.checkAuthRoute();
      } );

    this.destroyRef.onDestroy( () => {
      subscription.unsubscribe();
    } );
  }

  private checkAuthRoute(): void {
    this.isAuthRoute = this.router.url.startsWith( '/auth' );
  }
}
