import { TaskRepository } from '../../domain/repositories/TaskRepository.js';
import { TaskId } from '../../domain/value-objects/TaskId.js';

export interface DeleteTaskInput {
  taskId: string;
}

export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(input: DeleteTaskInput): Promise<void> {
    const taskId = TaskId.fromString(input.taskId);
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new Error('Task not found');
    }

    await this.taskRepository.delete(taskId);
  }
}
