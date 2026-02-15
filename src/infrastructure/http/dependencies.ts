import { MongoTaskRepository } from '../persistence/mongoose/MongoTaskRepository.js';
import { CreateTaskUseCase } from '../../application/use-cases/CreateTaskUseCase.js';
import { GetTasksUseCase } from '../../application/use-cases/GetTasksUseCase.js';
import { UpdateTaskStatusUseCase } from '../../application/use-cases/UpdateTaskStatusUseCase.js';
import { DeleteTaskUseCase } from '../../application/use-cases/DeleteTaskUseCase.js';
import { TaskController } from './controllers/TaskController.js';

// Singleton: se crea una sola vez
const taskRepository = new MongoTaskRepository();

// Casos de uso
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const getTasksUseCase = new GetTasksUseCase(taskRepository);
const updateTaskStatusUseCase = new UpdateTaskStatusUseCase(taskRepository);
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

// Controller con todas sus dependencias inyectadas
export const taskController = new TaskController(
  createTaskUseCase,
  getTasksUseCase,
  updateTaskStatusUseCase,
  deleteTaskUseCase
);
