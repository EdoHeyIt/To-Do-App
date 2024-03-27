import { Component, OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { UserPathService } from "../../core/services/user-path/user-path.service";
import { AuthService } from "../../core/services/auth/auth.service";
import { Subscription } from "rxjs";
import { TaskDto } from "../../core/interfaces/tasks/tasks-data";

@Component({
  selector: "app-user-path",
  templateUrl: "./user-path.component.html",
  styleUrl: "./user-path.component.scss",
})
export class UserPathComponent implements OnInit, OnDestroy {
  public userId: string = "";
  public taskTitle: string = "";
  public taskDescription: string = "";
  public taskId: string = "";
  public isUserLoggedIn: boolean = false;
  public userTasks: TaskDto[] = [];
  public allUserTasks: TaskDto[] = [];
  private userIdSubscription!: Subscription;

  constructor(
    private userPathService: UserPathService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Track user login status
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isUserLoggedIn = loggedIn;

      if (loggedIn) {
        // Get userId from session storage
        const storedUserId = sessionStorage.getItem("userId");

        if (storedUserId) {
          this.userId = storedUserId;
          this.getTasks();
        } else {
          // If userId is not stored, subscribe to userId$ observable
          if (!this.userId) {
            this.userIdSubscription = this.authService.userId$.subscribe(
              (userId: string) => {
                this.userId = userId;
                sessionStorage.setItem("userId", this.userId);
                this.getTasks();
              }
            );
          }
        }
      }
    });
  }

  ngOnDestroy() {
    // Remove userId from session storage
    sessionStorage.removeItem("userId");
    if (this.userIdSubscription) {
      this.userIdSubscription.unsubscribe();
    }
  }

  // Create a new task
  public createUserTask() {
    if (this.taskTitle && this.taskDescription && this.userId) {
      const taskDto = {
        title: this.taskTitle,
        description: this.taskDescription,
        status: "Active",
      };

      this.userPathService.createUserTask(this.userId, taskDto).subscribe({
        next: () => {
          this.getTasks();
        },
        error: () => {
          console.error("Please provide title and description");
        },
      });
    }
  }

  // Get all user tasks
  public getTasks(): void {
    this.userPathService.getAllTasks(this.userId).subscribe({
      next: (tasks: TaskDto[]) => {
        this.allUserTasks = tasks;
        this.userTasks = tasks;
      },
      error: () => {
        console.error("Error getting tasks");
      },
    });
  }

  // List user active tasks
  public activeTasks(): void {
    this.userTasks = this.allUserTasks.filter(
      (task) => task.status === "ACTIVE"
    );
  }

  // List user completed tasks
  public completedTasks(): void {
    this.userTasks = this.allUserTasks.filter(
      (task) => task.status === "COMPLETED"
    );
  }

  // Toggle task status
  public toggleTaskStatus(taskId: string | undefined): void {
    if (!taskId) {
      console.error("Task ID is not available");
      return;
    }

    if (this.userId) {
      this.userPathService.toggleTaskStatus(this.userId, taskId).subscribe({
        next: () => {
          const task = this.userTasks.find((task) => task._id === taskId);
          if (task) {
            task.status = task.status === "ACTIVE" ? "COMPLETED" : "ACTIVE";
          }
        },
        error: () => {
          console.error("Error toggling task status:");
        },
      });
    } else {
      console.error("User ID is not available");
    }
  }

  // Set task for updating
  public updateTask(task: TaskDto): void {
    task.isUpdating = true;
    task.updatedTitle = task.title;
    task.updatedDescription = task.description;
  }

  // Save updated task
  public saveUpdatedTask(task: TaskDto): void {
    if (
      task.updatedTitle &&
      task.updatedDescription &&
      task._id &&
      this.userId
    ) {
      this.userPathService
        .updateTask(
          this.userId,
          task._id,
          task.updatedTitle,
          task.updatedDescription
        )
        .subscribe({
          next: () => {
            task.isUpdating = false;
            this.getTasks();
          },
          error: () => {
            task.isUpdating = false;
          },
        });
    } else {
      console.error("Please provide updated title and description");
    }
  }
  // Update title and description inline
  public updateTaskText(task: TaskDto): void {
    task.isUpdating = !task.isUpdating;
  }

  // Delete a task
  public deleteTask(taskId: string | undefined): void {
    if (!taskId) {
      console.error("Task ID is not available");
      return;
    }

    this.userPathService.deleteUserTask(this.userId, taskId).subscribe({
      next: () => {
        this.getTasks();
      },
      error: () => {
        console.error("Task is not available");
      },
    });
  }

  // Find the percentage of completed tasks
  public getProgressInfo(): { color: string; text: string } {
    const totalTasks = this.allUserTasks.length;
    const completedTasks = this.allUserTasks.filter(
      (task) => task.status === "COMPLETED"
    ).length;
    const completedPercentage =
      totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    let color = "rgba(200, 0, 0, 1)";
    if (completedPercentage >= 100) {
      color = "rgba(0, 100, 0, 1)";
    } else if (completedPercentage >= 25) {
      color = "rgb(0, 52, 209)";
    }

    const text = `${completedPercentage.toFixed(0)}% Completed`;

    return { color, text };
  }
}
