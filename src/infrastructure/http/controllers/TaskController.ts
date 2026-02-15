import { Request, Response } from 'express';
import { CreateTaskUseCase } from '../../../application/use-cases/CreateTaskUseCase.js';
import { GetTasksUseCase } from '../../../application/use-cases/GetTasksUseCase.js';
import { UpdateTaskStatusUseCase } from '../../../application/use-cases/UpdateTaskStatusUseCase.js';
import { DeleteTaskUseCase } from '../../../application/use-cases/DeleteTaskUseCase.js';
import { TaskStatus } from '../../../domain/value-objects/TaskStatus.js';

export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getTasksUseCase: GetTasksUseCase,
    private readonly updateTaskStatusUseCase: UpdateTaskStatusUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { title, description } = req.body;

      const task = await this.createTaskUseCase.execute({
        title,
        description,
      });

      res.status(201).json({
        id: task.id.toString(),
        title: task.title,
        description: task.description,
        status: task.status,
        createdAt: task.createdAt,
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await this.getTasksUseCase.execute();

      res.status(200).json(
        tasks.map((task) => ({
          id: task.id.toString(),
          title: task.title,
          description: task.description,
          status: task.status,
          createdAt: task.createdAt,
        }))
      );
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async updateStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (typeof id !== 'string') {
        res.status(400).json({ error: 'Invalid task ID' });
        return;
      }

      const task = await this.updateTaskStatusUseCase.execute({
        taskId: id,
        newStatus: status as TaskStatus,
      });

      res.status(200).json({
        id: task.id.toString(),
        title: task.title,
        description: task.description,
        status: task.status,
        createdAt: task.createdAt,
      });
    } catch (error) {
      const message = (error as Error).message;
      const status = message === 'Task not found' ? 404 : 400;
      res.status(status).json({ error: message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (typeof id !== 'string') {
        res.status(400).json({ error: 'Invalid task ID' });
        return;
      }

      await this.deleteTaskUseCase.execute({ taskId: id });

      res.status(204).send();
    } catch (error) {
      const message = (error as Error).message;
      const status = message === 'Task not found' ? 404 : 400;
      res.status(status).json({ error: message });
    }
  }
}
