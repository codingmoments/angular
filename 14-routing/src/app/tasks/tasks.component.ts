import { Component, DestroyRef, OnInit, computed, inject, input } from '@angular/core';

import { ActivatedRoute, RouterLink } from "@angular/router";
import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';

@Component( {
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [ TaskComponent, RouterLink ],
} )
export class TasksComponent implements OnInit {
  private tasksService = inject( TasksService );
  private activatedRoute = inject( ActivatedRoute );
  private destroyRef = inject( DestroyRef );

  userId = input.required<string>();
  sort = input<'asc' | 'desc'>( 'asc' );
  order?: 'asc' | 'desc';

  userTasks = computed( () => {
    return this.tasksService.allTasks().filter( task => task.userId === this.userId() );
  } );


  ngOnInit(): void {
    const subscription = this.activatedRoute.queryParams.subscribe( params => {
      this.order = params[ 'sort' ];
    } );
    this.destroyRef.onDestroy( () => subscription.unsubscribe() );
  }

}
