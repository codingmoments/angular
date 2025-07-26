import { inject, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";
import { LoggingService } from "../logging.service";

export class TasksService {
  private tasks = signal<Task[]>( [] );
  private loggingService = inject( LoggingService );

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
    this.loggingService.log( 'Added task with title ' + taskData.title );
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
    this.loggingService.log( 'Changed task stauts to ' + newStatus );
  }
}