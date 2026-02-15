import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Express } from 'express';
import { Server } from '../Server.js';
import { TaskStatus } from '../../../domain/value-objects/TaskStatus.js';

describe('Tasks API E2E Tests', () => {
  let mongoServer: MongoMemoryServer;
  let app: Express;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);

    const server = new Server();
    app = server.getApp();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await mongoose.connection.dropDatabase();
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Buy groceries',
          description: 'Milk and bread',
        })
        .expect(201);

      expect(response.body).toMatchObject({
        title: 'Buy groceries',
        description: 'Milk and bread',
        status: TaskStatus.PENDING,
      });
      expect(response.body.id).toBeDefined();
      expect(response.body.createdAt).toBeDefined();
    });

    it('should return 400 when title is missing', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({
          description: 'No title',
        })
        .expect(400);

      expect(response.body.error).toBe('Task title cannot be empty');
    });

    it('should return 400 when title is empty', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({
          title: '',
        })
        .expect(400);

      expect(response.body.error).toBe('Task title cannot be empty');
    });
  });

  describe('GET /api/tasks', () => {
    it('should return empty array when no tasks exist', async () => {
      const response = await request(app).get('/api/tasks').expect(200);

      expect(response.body).toEqual([]);
    });

    it('should return all tasks', async () => {
      await request(app).post('/api/tasks').send({ title: 'Task 1' });
      await request(app).post('/api/tasks').send({ title: 'Task 2' });

      const response = await request(app).get('/api/tasks').expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].title).toBe('Task 1');
      expect(response.body[1].title).toBe('Task 2');
    });
  });

  describe('PATCH /api/tasks/:id/status', () => {
    it('should update task status', async () => {
      const createResponse = await request(app).post('/api/tasks').send({ title: 'Test task' });

      const taskId = createResponse.body.id;

      const response = await request(app)
        .patch(`/api/tasks/${taskId}/status`)
        .send({ status: TaskStatus.COMPLETED })
        .expect(200);

      expect(response.body.status).toBe(TaskStatus.COMPLETED);
    });

    it('should return 404 when task not found', async () => {
      const fakeId = '550e8400-e29b-41d4-a957-446655440000';

      const response = await request(app)
        .patch(`/api/tasks/${fakeId}/status`)
        .send({ status: TaskStatus.COMPLETED })
        .expect(404);

      expect(response.body.error).toBe('Task not found');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task', async () => {
      const createResponse = await request(app).post('/api/tasks').send({ title: 'To be deleted' });

      const taskId = createResponse.body.id;

      await request(app).delete(`/api/tasks/${taskId}`).expect(204);

      const getResponse = await request(app).get('/api/tasks');
      expect(getResponse.body).toHaveLength(0);
    });

    it('should return 404 when task not found', async () => {
      const fakeId = '550e8400-e29b-41d4-a957-446655440000';

      const response = await request(app).delete(`/api/tasks/${fakeId}`).expect(404);

      expect(response.body.error).toBe('Task not found');
    });
  });
});
