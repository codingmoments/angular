import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent, resolveTitle, resolveUserName } from "./users/user-tasks/user-tasks.component";
import { routes as userRoutes } from "./users/users.routes";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = ( route, segments ) => {
  const router = inject( Router );
  const userSegment = segments[ 1 ].path;

  if ( userSegment === 'u1' ||
    userSegment === 'u3' ||
    userSegment === 'u5' ) {
    return true;
  }
  return new RedirectCommand( router.parseUrl( '/unauthorized' ) );
};

export const APP_ROUTES: Routes =
  [
    {
      path: '',
      component: NoTaskComponent,
      title: 'No Task Selected'
    },
    {
      path: 'users/:userId',
      component: UserTasksComponent,
      children: userRoutes,
      canMatch: [ dummyCanMatch ],
      data: { message: 'Hello!' },
      resolve: {
        userName: resolveUserName
      },
      title: resolveTitle
    },
    {
      path: '**',
      component: NotFoundComponent
    }
  ];