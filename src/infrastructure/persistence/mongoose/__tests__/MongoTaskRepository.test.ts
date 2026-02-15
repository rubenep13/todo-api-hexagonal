import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { MongoTaskRepository } from '../MongoTaskRepository.js';
import { Task } from '../../../../domain/entities/Task.js';
import { TaskStatus } from '../../../../domain/value-objects/TaskStatus.js';
import { TaskId } from '../../../../domain/value-objects/TaskId.js';

describe('MongoTaskRepository Integration Tests', () => {
  let mongoServer: MongoMemoryServer;
  let repository: MongoTaskRepository;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await mongoose.connection.dropDatabase();
    repository = new MongoTaskRepository();
  });

  it('should save and retrieve a task', async () => {
    const task = Task.create({
      title: 'Test task',
      description: 'Test description',
    });

    await repository.save(task);

    const retrieved = await repository.findById(task.id);

    expect(retrieved).not.toBeNull();
    expect(retrieved!.id.equals(task.id)).toBe(true);
    expect(retrieved!.title).toBe('Test task');
    expect(retrieved!.description).toBe('Test description');
  });

  it('should return null when task not found', async () => {
    const taskId = TaskId.create();
    const result = await repository.findById(taskId);

    expect(result).toBeNull();
  });

  it('should update existing task', async () => {
    const task = Task.create({ title: 'Original title' });
    await repository.save(task);

    task.updateStatus(TaskStatus.COMPLETED);
    await repository.save(task);

    const retrieved = await repository.findById(task.id);

    expect(retrieved!.status).toBe(TaskStatus.COMPLETED);
  });

  it('should retrieve all tasks', async () => {
    const task1 = Task.create({ title: 'Task 1' });
    const task2 = Task.create({ title: 'Task 2' });

    await repository.save(task1);
    await repository.save(task2);

    const tasks = await repository.findAll();

    expect(tasks).toHaveLength(2);
  });

  it('should delete a task', async () => {
    const task = Task.create({ title: 'To be deleted' });
    await repository.save(task);

    await repository.delete(task.id);

    const retrieved = await repository.findById(task.id);
    expect(retrieved).toBeNull();
  });
});
