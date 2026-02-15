import { Router } from 'express';
import { taskController } from '../dependencies.js';

const router = Router();

// Bind para mantener contexto de 'this' en los métodos del controller
router.post('/', taskController.create.bind(taskController));
router.get('/', taskController.getAll.bind(taskController));
router.patch('/:id/status', taskController.updateStatus.bind(taskController));
router.delete('/:id', taskController.delete.bind(taskController));

export const TaskRouter = router;
