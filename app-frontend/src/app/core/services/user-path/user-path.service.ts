import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { apiConstant } from '../../constant/APIConstant'
import { ErrorHandler } from '../../../shared/error-handler/error-handler'
import { TaskDto } from '../../interfaces/tasks/tasks-data'

@Injectable({
  providedIn: 'root'
})
export class UserPathService {
  constructor (
    private readonly http: HttpClient,
    private readonly errorHandler: ErrorHandler
  ) {}

  // Create a new user task
  public createUserTask (userId: string, taskDto: TaskDto): Observable<unknown> {
    const createTaskEndpoint = apiConstant.tasks.createTask(userId)

    return this.http.post<unknown>(createTaskEndpoint, taskDto).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorHandler.handleError(error)
      })
    );
  }

   // Get all user tasks
   public getAllTasks (userId: string): Observable<TaskDto[]> {
    const getTasksEndpoint = apiConstant.tasks.getTasks(userId);
    return this.http.get<TaskDto[]>(getTasksEndpoint).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorHandler.handleError(error);
      })
    );
  }

  // Update a user task
  public updateTask (
    userId: string,
    taskId: string,
    title: string,
    description: string
  ): Observable<unknown> {
    const updateTaskEndpoint = apiConstant.tasks.updateTask(userId, taskId);
    const body = { title, description };

    return this.http.patch(updateTaskEndpoint, body).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorHandler.handleError(error);
      })
    );
  }

  // Toggle the status of a user task
  public toggleTaskStatus (userId: string, taskId: string): Observable<unknown> {
    const toggleStatusEndpoint = apiConstant.tasks.toggleStatus(userId, taskId);
    return this.http.patch(toggleStatusEndpoint, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorHandler.handleError(error);
      })
    );
  }

  // Delete a user task
  public deleteUserTask (userId: string, taskId: string): Observable<unknown> {
    const deleteTaskEndpoint = apiConstant.tasks.deleteTask(userId, taskId);
    return this.http.delete(deleteTaskEndpoint).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorHandler.handleError(error);
      })
    );
  }
}
