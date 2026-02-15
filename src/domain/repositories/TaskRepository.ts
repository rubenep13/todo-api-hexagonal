import { Task } from '../entities/Task.js';
import { TaskId } from '../value-objects/TaskId.js';

export interface TaskRepository {
  save(task: Task): Promise<void>;
  findById(id: TaskId): Promise<Task | null>;
  findAll(): Promise<Task[]>;
  delete(id: TaskId): Promise<void>;
}
