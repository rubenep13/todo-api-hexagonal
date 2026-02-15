import { Task } from '../Task.js';
import { TaskStatus } from '../../value-objects/TaskStatus.js';

describe('Task', () => {
  describe('create', () => {
    it('should create a task with valid title', () => {
      const task = Task.create({
        title: 'Buy groceries',
        description: 'Milk, eggs, bread',
      });

      expect(task.title).toBe('Buy groceries');
      expect(task.description).toBe('Milk, eggs, bread');
      expect(task.status).toBe(TaskStatus.PENDING);
      expect(task.createdAt).toBeInstanceOf(Date);
      expect(task.id).toBeDefined();
    });

    it('should create task without description', () => {
      const task = Task.create({
        title: 'Simple task',
      });

      expect(task.title).toBe('Simple task');
      expect(task.description).toBeUndefined();
    });

    it('should trim title whitespace', () => {
      const task = Task.create({
        title: '  Clean room  ',
      });

      expect(task.title).toBe('Clean room');
    });

    it('should throw error when title is empty', () => {
      expect(() => Task.create({ title: '' })).toThrow('Task title cannot be empty');
    });

    it('should throw error when title is only whitespace', () => {
      expect(() => Task.create({ title: '   ' })).toThrow('Task title cannot be empty');
    });

    it('should set default status to PENDING', () => {
      const task = Task.create({ title: 'Test task' });

      expect(task.status).toBe(TaskStatus.PENDING);
    });
  });

  describe('updateStatus', () => {
    it('should update task status', () => {
      const task = Task.create({ title: 'Test task' });

      task.updateStatus(TaskStatus.IN_PROGRESS);
      expect(task.status).toBe(TaskStatus.IN_PROGRESS);

      task.updateStatus(TaskStatus.COMPLETED);
      expect(task.status).toBe(TaskStatus.COMPLETED);
    });

    it('should allow changing from completed to pending', () => {
      const task = Task.create({ title: 'Test task' });
      task.updateStatus(TaskStatus.COMPLETED);

      task.updateStatus(TaskStatus.PENDING);
      expect(task.status).toBe(TaskStatus.PENDING);
    });
  });
});
