import { Task } from '../../../domain/entities/Task.js';
import { TaskId } from '../../../domain/value-objects/TaskId.js';
import { TaskRepository } from '../../../domain/repositories/TaskRepository.js';
import { TaskModel } from './TaskSchema.js';
import { TaskMapper } from './TaskMapper.js';

export class MongoTaskRepository implements TaskRepository {
  async save(task: Task): Promise<void> {
    const doc = TaskMapper.toPersistence(task);

    await TaskModel.findOneAndUpdate({ id: doc.id }, doc, {
      upsert: true,
      returnDocument: 'after',
    });
    // Note: Upsert will create a new document if it doesn't exist, or update the existing one. The 'returnDocument: "after"' option returns the updated document.
  }

  async findById(id: TaskId): Promise<Task | null> {
    const doc = await TaskModel.findOne({ id: id.toString() }).lean();

    if (!doc) {
      return null;
    }

    return TaskMapper.toDomain(doc);
  }

  async findAll(): Promise<Task[]> {
    const docs = await TaskModel.find().lean();
    return docs.map(TaskMapper.toDomain);
  }

  async delete(id: TaskId): Promise<void> {
    await TaskModel.deleteOne({ id: id.toString() });
  }
}
