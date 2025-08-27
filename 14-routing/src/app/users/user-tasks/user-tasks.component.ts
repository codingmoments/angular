import { Component, OnInit, inject, input } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';
import { UsersService } from '../users.service';

@Component( {
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [ RouterOutlet, RouterLink ],
} )
export class UserTasksComponent implements OnInit {
  private activatedRoute = inject( ActivatedRoute );

  userName = input.required<string>();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( {
      next: ( data ) => {
        console.log( data );
      },
    } );
  }
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  currentRouterState: RouterStateSnapshot
) => {
  const userService = inject( UsersService );
  const user = userService.users.find(
    user => user.id === activatedRoute.paramMap.get( 'userId' )
  );
  return user?.name || '';
}

export const resolveTitle: ResolveFn<string> = (
  activatedRoute, currentRouterState
) => {
  return resolveUserName( activatedRoute, currentRouterState ) + "'s Tasks";
}