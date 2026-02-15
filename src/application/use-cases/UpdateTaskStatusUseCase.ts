import { Task } from '../../domain/entities/Task.js';
import { TaskRepository } from '../../domain/repositories/TaskRepository.js';
import { TaskId } from '../../domain/value-objects/TaskId.js';
import { TaskStatus } from '../../domain/value-objects/TaskStatus.js';

export interface UpdateTaskStatusInput {
  taskId: string;
  newStatus: TaskStatus;
}

export class UpdateTaskStatusUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(input: UpdateTaskStatusInput): Promise<Task> {
    const taskId = TaskId.fromString(input.taskId);
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new Error('Task not found');
    }

    task.updateStatus(input.newStatus);
    await this.taskRepository.save(task);

    return task;
  }
}
