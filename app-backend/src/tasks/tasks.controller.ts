import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskDto } from "src/dto/task";

@Controller("task")
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  // Endpoint to create a new user task
  @Post(":userId")
  public async createUserTask(
    @Param("userId") userId: string,
    @Body(ValidationPipe) taskDto: TaskDto
  ): Promise<any> {
    try {
      const newTask = await this.taskService.createUserTask(userId, taskDto);
      return newTask;
    } catch (error) {
      throw new Error("Failed to create task");
    }
  }

  // Endpoint to get all user tasks
  @Get(":userId")
  public async getAllTasks(@Param("userId") userId: string): Promise<any> {
    try {
      const allTasks = await this.taskService.getTasks(userId);
      return allTasks;
    } catch (error) {
      throw new Error("Failed to retrieve user tasks");
    }
  }

  // Endpoint to update a task
  @Patch(":userId/:id/update")
  public async updateTask(
    @Param("userId") userId: string,
    @Param("id") taskId: string,
    @Body("title") title: string,
    @Body("description") description: string
  ): Promise<any> {
    try {
      const updatedTask = await this.taskService.updateTask(
        userId,
        taskId,
        title,
        description
      );
      return updatedTask;
    } catch (error) {
      throw new Error("Failed to update task");
    }
  }

  // Endpoint to toggle the status
  @Patch(":userId/:id/toggle-status")
  public async toggleTaskStatus(
    @Param("userId") userId: string,
    @Param("id") taskId: string
  ): Promise<any> {
    try {
      const toggledTask = await this.taskService.toggleTaskStatus(
        userId,
        taskId
      );
      return toggledTask;
    } catch (error) {
      throw new Error("Failed to update task status");
    }
  }

  // Endpoint to delete a task
  @Delete(":userId/:id/delete")
  public async deleteTask(
    @Param("userId") userId: string,
    @Param("id") taskId: string
  ): Promise<any> {
    try {
      const deletedTask = await this.taskService.deleteTask(userId, taskId);
      return deletedTask;
    } catch (error) {
      throw new Error("Failed to delete task");
    }
  }
}
