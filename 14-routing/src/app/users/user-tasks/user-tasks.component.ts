import { Component, inject, input } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';
import { UsersService } from '../users.service';

@Component( {
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [ RouterOutlet, RouterLink ],
} )
export class UserTasksComponent {
  userName = input.required<string>();
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