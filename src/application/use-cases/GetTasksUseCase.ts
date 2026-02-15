import { Task } from '../../domain/entities/Task.js';
import { TaskRepository } from '../../domain/repositories/TaskRepository.js';

export class GetTasksUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }
}
