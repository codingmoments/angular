import { Routes } from "@angular/router"
import { TasksComponent } from "./tasks/tasks.component"

export const APP_ROUTES: Routes =
  [
    {
      path: 'tasks',
      component: TasksComponent
    }
  ];