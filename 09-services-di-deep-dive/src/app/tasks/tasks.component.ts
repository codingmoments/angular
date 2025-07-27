import { Component, InjectionToken } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksService } from './tasks.service';

export const TasksServiceToken = new InjectionToken<TasksService>( 'tasks-service-token' );

@Component( {
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [ NewTaskComponent, TasksListComponent ],
  providers: [ { provide: TasksServiceToken, useClass: TasksService } ]
} )
export class TasksComponent { }
