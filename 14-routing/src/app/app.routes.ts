import { Routes } from "@angular/router";
import { routes as userRoutes } from "./users/users.routes";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent, resolveUserName } from "./users/user-tasks/user-tasks.component";

export const APP_ROUTES: Routes =
  [
    {
      path: '',
      component: NoTaskComponent
    },
    {
      path: 'users/:userId',
      component: UserTasksComponent,
      children: userRoutes,
      data: { message: 'Hello!' },
      resolve: {
        userName: resolveUserName
      }
    },
    {
      path: '**',
      component: NotFoundComponent
    }
  ];