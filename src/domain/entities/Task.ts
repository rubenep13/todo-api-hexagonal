import { TaskId } from '../value-objects/TaskId.js';
import { TaskStatus } from '../value-objects/TaskStatus.js';

export interface TaskProps {
  id: TaskId;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
}

export class Task {
  private constructor(private readonly props: TaskProps) {}

  public static create(params: { title: string; description?: string }): Task {
    if (!params.title || params.title.trim().length === 0) {
      throw new Error('Task title cannot be empty');
    }

    return new Task({
      id: TaskId.create(),
      title: params.title.trim(),
      description: params.description?.trim(),
      status: TaskStatus.PENDING,
      createdAt: new Date(),
    });
  }

  public static fromPersistence(props: TaskProps): Task {
    return new Task(props);
  }

  public get id(): TaskId {
    return this.props.id;
  }

  public get title(): string {
    return this.props.title;
  }

  public get description(): string | undefined {
    return this.props.description;
  }

  public get status(): TaskStatus {
    return this.props.status;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public updateStatus(newStatus: TaskStatus): void {
    this.props.status = newStatus;
  }
}
