import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task, TaskStatus } from "./tasks.schema";
import { type TaskDto } from "src/dto/task";
import { User } from "src/authentication/user.schema";

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly TaskModel: Model<Task>,
    @InjectModel(User.name) private readonly UserModel: Model<User>
  ) {}

  // Creating a new task
  public async createUserTask(userId: string, taskDto: TaskDto): Promise<any> {
    try {
      const user = await this.UserModel.findById(userId);

      if (user == null) {
        throw new NotFoundException("User not found");
      }

      const newTask = new this.TaskModel({
        title: taskDto.title,
        description: taskDto.description,
        status: TaskStatus.ACTIVE,
        userId: user._id,
      });

      return await newTask.save();
    } catch (error) {
      throw new Error("Error while creating user task");
    }
  }

  // Find the user tasks
  public async getTasks(userId: string): Promise<any> {
    try {
      const user = await this.UserModel.findById(userId).exec();

      if (user == null) {
        throw new NotFoundException("User not found");
      }

      // Find tasks related to the user
      const tasks = await this.TaskModel.find({ userId: user._id })
        .sort({ createdAt: -1 })
        .exec();

      return tasks;
    } catch (error) {
      throw new Error("Error while fetching tasks}");
    }
  }

  // Update the user task
  public async updateTask(
    userId: string,
    taskId: string,
    title: string,
    description: string
  ): Promise<any> {
    try {
      const existingTask = await this.TaskModel.findById(taskId);

      if (existingTask == null) {
        throw new NotFoundException("Task not found");
      }

      if (existingTask.userId.toString() !== userId) {
        throw new ForbiddenException("You do not have permission");
      }

      existingTask.title = title;
      existingTask.description = description;

      return await existingTask.save();
    } catch (error) {
      throw new Error("Error updating task");
    }
  }

  // Toggling the status of a task
  public async toggleTaskStatus(userId: string, taskId: string): Promise<any> {
    try {
      const existingTask = await this.TaskModel.findById(taskId);

      if (existingTask == null) {
        throw new NotFoundException("Task not found");
      }

      if (existingTask.userId.toString() !== userId) {
        throw new ForbiddenException("You do not have permission");
      }

      existingTask.status =
        existingTask.status === TaskStatus.ACTIVE
          ? TaskStatus.COMPLETED
          : TaskStatus.ACTIVE;

      return await existingTask.save();
    } catch (error) {
      throw new Error("Error toggling task status");
    }
  }

  // Delete a task
  public async deleteTask(userId: string, taskId: string): Promise<any> {
    try {
      const existingTask = await this.TaskModel.findById(taskId);

      if (existingTask == null) {
        throw new NotFoundException("Task not found");
      }

      if (existingTask.userId.toString() !== userId) {
        throw new ForbiddenException("You do not have permission");
      }

      const deletedTask = await existingTask.deleteOne();

      return deletedTask;
    } catch (error) {
      throw new Error("Error deleting task");
    }
  }
}
