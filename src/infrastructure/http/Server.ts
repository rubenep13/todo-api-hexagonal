import express, { Express } from 'express';
import { TaskRouter } from './routes/TaskRouter.js';

export class Server {
  private app: Express;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    this.app.use('/api/tasks', TaskRouter);
  }

  public getApp(): Express {
    return this.app;
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}
