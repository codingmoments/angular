import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TasksServiceToken } from '../tasks.component';
import { TASK_STATUS_OPTIONS, TaskStatusOptions } from '../task.model';

@Component( {
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [ TaskItemComponent ],
  providers: [ { provide: TASK_STATUS_OPTIONS, useValue: TaskStatusOptions } ]
} )
export class TasksListComponent {
  private tasksService = inject( TasksServiceToken );
  private selectedFilter = signal<string>( 'all' );
  taskStatusOptions = inject( TASK_STATUS_OPTIONS );
  tasks = computed( () => {
    switch ( this.selectedFilter() ) {  // Use computed to derive tasks based on the selected filter
      case 'open':
        return this.tasksService.allTasks().filter( task => task.status === 'OPEN' );
      case 'in-progress':
        return this.tasksService.allTasks().filter( task => task.status === 'IN_PROGRESS' );
      case 'done':
        return this.tasksService.allTasks().filter( task => task.status === 'DONE' );
      default:
        return this.tasksService.allTasks();
    }
  } );

  onChangeTasksFilter( filter: string ) {
    this.selectedFilter.set( filter );
  }
}
