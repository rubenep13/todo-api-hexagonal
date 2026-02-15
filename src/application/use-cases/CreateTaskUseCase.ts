import { Task } from '../../domain/entities/Task.js';
import { TaskRepository } from '../../domain/repositories/TaskRepository.js';

export interface CreateTaskInput {
  title: string;
  description?: string;
}

export class CreateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(input: CreateTaskInput): Promise<Task> {
    const task = Task.create({
      title: input.title,
      description: input.description,
    });

    await this.taskRepository.save(task);

    return task;
  }
}
