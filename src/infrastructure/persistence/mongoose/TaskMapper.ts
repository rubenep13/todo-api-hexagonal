import { Task } from '../../../domain/entities/Task.js';
import { TaskId } from '../../../domain/value-objects/TaskId.js';
import { TaskStatus } from '../../../domain/value-objects/TaskStatus.js';
import { TaskDocument } from './TaskSchema.js';

export class TaskMapper {
  static toDomain(doc: TaskDocument): Task {
    return Task.fromPersistence({
      id: TaskId.fromString(doc.id),
      title: doc.title,
      description: doc.description,
      status: doc.status as TaskStatus,
      createdAt: doc.createdAt,
    });
  }

  static toPersistence(task: Task): TaskDocument {
    return {
      id: task.id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      createdAt: task.createdAt,
    };
  }
}
