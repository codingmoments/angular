import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent, resolveTitle, resolveUserName } from "./users/user-tasks/user-tasks.component";
import { routes as userRoutes } from "./users/users.routes";
import { inject } from "@angular/core";
import { AuthComponent } from "./auth/auth.component";

const dummyCanMatch: CanMatchFn = ( route, segments ) => {
  const router = inject( Router );

  let userData = window.localStorage.getItem( 'userData' );
  JSON.parse( userData || '{}' );
  if ( userData && new Date( JSON.parse( userData )._tokenExpirationDate ) > new Date() ) {
    return true;
  }

  if( segments[0] && segments[0].path === 'auth' ) {
    return true;
  }

  return new RedirectCommand( router.parseUrl( '/auth' ) );
};

export const APP_ROUTES: Routes =
  [
    {
      path: '',
      canMatch: [ dummyCanMatch ],
      component: NoTaskComponent,
      title: 'No Task Selected'
    },
    {
      path: 'auth',
      component: AuthComponent,
      title: 'Authentication'
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
      canMatch: [ dummyCanMatch ],
      component: NotFoundComponent
    }
  ];