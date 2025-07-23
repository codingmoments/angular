import { Injectable, signal } from "@angular/core";
import { Task } from "./task.model";

@Injectable( {
  providedIn: 'root'
} )
export class TasksService {
  tasks = signal<Task[]>( [] );

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
}