import { DeleteTaskUseCase } from '../DeleteTaskUseCase.js';
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

describe('DeleteTaskUseCase', () => {
  let repository: InMemoryTaskRepository;
  let useCase: DeleteTaskUseCase;

  beforeEach(() => {
    repository = new InMemoryTaskRepository();
    useCase = new DeleteTaskUseCase(repository);
  });

  it('should delete existing task', async () => {
    const task = Task.create({ title: 'Test task' });
    await repository.save(task);

    await useCase.execute({ taskId: task.id.toString() });

    const tasks = await repository.findAll();
    expect(tasks).toHaveLength(0);
  });

  it('should throw error when task not found', async () => {
    await expect(
      useCase.execute({ taskId: '550e8400-e29b-41d4-a957-446655440000' })
    ).rejects.toThrow('Task not found');
  });
});
