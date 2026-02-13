import { TaskId } from '../TaskId';

describe('TaskId', () => {
  describe('create', () => {
    it('should create a valid TaskId with UUID format', () => {
      const taskId = TaskId.create();
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

      expect(uuidRegex.test(taskId.toString())).toBe(true);
    });

    it('should create different IDs for multiple calls', () => {
      const id1 = TaskId.create();
      const id2 = TaskId.create();

      expect(id1.equals(id2)).toBe(false);
    });
  });

  describe('fromString', () => {
    it('should create TaskId from valid string', () => {
      const validId = '123e4567-e89b-12d3-a456-426614174000';
      const taskId = TaskId.fromString(validId);

      expect(taskId.toString()).toBe(validId);
    });

    it('should throw error when string is empty', () => {
      expect(() => TaskId.fromString('')).toThrow('TaskId cannot be empty');
    });

    it('should throw error when string is only whitespace', () => {
      expect(() => TaskId.fromString('   ')).toThrow('TaskId cannot be empty');
    });
  });

  describe('equals', () => {
    it('should return true for TaskIds with same value', () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const taskId1 = TaskId.fromString(id);
      const taskId2 = TaskId.fromString(id);

      expect(taskId1.equals(taskId2)).toBe(true);
    });

    it('should return false for TaskIds with different values', () => {
      const taskId1 = TaskId.fromString('123e4567-e89b-12d3-a456-426614174000');
      const taskId2 = TaskId.fromString('987e6543-e21b-43d3-b654-123456789abc');

      expect(taskId1.equals(taskId2)).toBe(false);
    });
  });
});
