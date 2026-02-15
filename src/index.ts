//console.log('TODO API - Setup completado');
import { Task } from './domain/entities/Task';

const task = Task.create({ title: 'Test' });
console.log(task.title);
