import { UpdateTaskStatusUseCase } from '../UpdateTaskStatusUseCase.js';
import { Task } from '../../../domain/entities/Task.js';
import { TaskRepository } from '../../../domain/repositories/TaskRepository.js';
import { TaskId } from '../../../domain/value-objects/TaskId.js';
import { TaskStatus } from '../../../domain/value-objects/TaskStatus.js';

class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];

  async save(task: Task): Promise<void> {
    const index = this.tasks.findIndex((t) => t.id.equals(task.id));
    if (index >= 0) {
      this.tasks[index] = task;
    } else {
      this.tasks.push(task);
    }
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

describe('UpdateTaskStatusUseCase', () => {
  let repository: InMemoryTaskRepository;
  let useCase: UpdateTaskStatusUseCase;

  beforeEach(() => {
    repository = new InMemoryTaskRepository();
    useCase = new UpdateTaskStatusUseCase(repository);
  });

  it('should update task status', async () => {
    const task = Task.create({ title: 'Test task' });
    await repository.save(task);

    const result = await useCase.execute({
      taskId: task.id.toString(),
      newStatus: TaskStatus.IN_PROGRESS,
    });

    expect(result.status).toBe(TaskStatus.IN_PROGRESS);
    expect(result.id.equals(task.id)).toBe(true);
  });

  it('should allow changing from completed to pending', async () => {
    const task = Task.create({ title: 'Test task' });
    task.updateStatus(TaskStatus.COMPLETED);
    await repository.save(task);

    const result = await useCase.execute({
      taskId: task.id.toString(),
      newStatus: TaskStatus.PENDING,
    });

    expect(result.status).toBe(TaskStatus.PENDING);
  });

  it('should throw error when task not found', async () => {
    await expect(
      useCase.execute({
        taskId: '550e8400-e29b-41d4-a957-446655440000',
        newStatus: TaskStatus.COMPLETED,
      })
    ).rejects.toThrow('Task not found');
  });
});
