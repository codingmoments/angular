import { ResolveFn, Routes } from '@angular/router';

import { NewTaskComponent, canLeaveEditPage } from '../tasks/new-task/new-task.component';
import { Task } from '../tasks/task/task.model';
import { TasksService } from '../tasks/tasks.service';
import { inject } from '@angular/core';
import { TasksComponent, resolveUserTasks } from '../tasks/tasks.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: TasksComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      userTasks: resolveUserTasks,
    },
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    canDeactivate: [ canLeaveEditPage ]
  },
];
