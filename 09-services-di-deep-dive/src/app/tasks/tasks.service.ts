import { signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";

export class TasksService {
  private tasks = signal<Task[]>( [] );

  allTasks = this.tasks.asReadonly();

  addTask( taskData: { title: string, description: string } ) {
    this.tasks.update( tasks => [
      ...tasks,
      {
        id: Math.random().toString(),
        ...taskData,
        status: 'OPEN'
      }
    ] );
  }

  updateTaskStatus( taskId: string, newStatus: TaskStatus ) {
    this.tasks.update( oldTasks =>
      oldTasks.map( task => {
        if ( task.id === taskId ) {
          return { ...task, status: newStatus };
        }
        return task;
      }
      ) );
  }
}