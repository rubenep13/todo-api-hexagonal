import { GetTasksUseCase } from '../GetTasksUseCase.js';
import { Task } from '../../../domain/entities/Task.js';
import { TaskRepository } from '../../../domain/repositories/TaskRepository.js';
import { TaskId } from '../../../domain/value-objects/TaskId.js';

class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];

  async save(task: Task): Promise<void> {
    this.tasks.push(task);
  }

  async findById(id: TaskId): Promise<Task | null> {
    return this.tasks.find((t) => t.id.equals(id)) || null;
  }

  async findAll(): Promise<Task[]> {
    return [...this.tasks];
  }

  async delete(id: TaskId): Promise<void> {
    this.tasks = this.tasks.filter((t) => !t.id.equals(id));
  }
}

describe('GetTasksUseCase', () => {
  let repository: InMemoryTaskRepository;
  let useCase: GetTasksUseCase;

  beforeEach(() => {
    repository = new InMemoryTaskRepository();
    useCase = new GetTasksUseCase(repository);
  });

  it('should return empty array when no tasks exist', async () => {
    const tasks = await useCase.execute();

    expect(tasks).toEqual([]);
  });

  it('should return all tasks', async () => {
    const task1 = Task.create({ title: 'Task 1' });
    const task2 = Task.create({ title: 'Task 2' });

    await repository.save(task1);
    await repository.save(task2);

    const tasks = await useCase.execute();

    expect(tasks).toHaveLength(2);
    expect(tasks).toContain(task1);
    expect(tasks).toContain(task2);
  });
});
