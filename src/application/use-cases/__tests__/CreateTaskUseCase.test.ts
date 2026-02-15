import { CreateTaskUseCase } from '../CreateTaskUseCase.js';
import { Task } from '../../../domain/entities/Task.js';
import { TaskRepository } from '../../../domain/repositories/TaskRepository.js';
import { TaskId } from '../../../domain/value-objects/TaskId.js';
import { TaskStatus } from '../../../domain/value-objects/TaskStatus.js';

// Implementación de un repositorio en memoria para pruebas
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

  // Helper para tests
  getSavedTasks(): Task[] {
    return this.tasks;
  }
}

describe('CreateTaskUseCase', () => {
  let repository: InMemoryTaskRepository;
  let useCase: CreateTaskUseCase;

  beforeEach(() => {
    repository = new InMemoryTaskRepository();
    useCase = new CreateTaskUseCase(repository);
  });

  it('should create and save a task with title and description', async () => {
    const result = await useCase.execute({
      title: 'Buy groceries',
      description: 'Milk and bread',
    });

    expect(result.title).toBe('Buy groceries');
    expect(result.description).toBe('Milk and bread');
    expect(result.status).toBe(TaskStatus.PENDING);

    const savedTasks = repository.getSavedTasks();
    expect(savedTasks).toHaveLength(1);
    expect(savedTasks[0]).toBe(result);
  });

  it('should create and save a task without description', async () => {
    const result = await useCase.execute({
      title: 'Simple task',
    });

    expect(result.title).toBe('Simple task');
    expect(result.description).toBeUndefined();

    const savedTasks = repository.getSavedTasks();
    expect(savedTasks).toHaveLength(1);
  });

  it('should throw error when title is empty', async () => {
    await expect(useCase.execute({ title: '' })).rejects.toThrow('Task title cannot be empty');

    expect(repository.getSavedTasks()).toHaveLength(0);
  });

  it('should trim title before creating task', async () => {
    const result = await useCase.execute({
      title: '  Spaced title  ',
    });

    expect(result.title).toBe('Spaced title');
  });
});
