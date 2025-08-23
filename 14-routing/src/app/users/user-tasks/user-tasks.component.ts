import { Component, DestroyRef, OnInit, computed, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component( {
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [ RouterOutlet ],
} )
export class UserTasksComponent implements OnInit {
  private userService = inject( UsersService );
  private activatedRoute = inject( ActivatedRoute );
  private destroyRef = inject( DestroyRef );

  userNameWithActivatedRoute = '';
  userId = input.required<string>();
  userName = computed(
    () => this.userService.users.find( user => user.id === this.userId() )?.name
  );

  ngOnInit(): void {
    console.log( this.activatedRoute );
    const subscription = this.activatedRoute.paramMap.subscribe( {
      next: paramMap => {
        const userIdParam = paramMap.get( 'userId' );
        const user = this.userService.users.find( user => user.id === userIdParam );
        this.userNameWithActivatedRoute = user?.name || '';
      },
    } );
    this.destroyRef.onDestroy( () => subscription.unsubscribe() );
  }
}
