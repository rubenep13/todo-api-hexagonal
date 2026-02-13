import { v4 } from 'uuid';
const uuidv4 = v4;

export class TaskId {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(): TaskId {
    return new TaskId(uuidv4());
  }

  public static fromString(value: string): TaskId {
    if (!value || value.trim().length === 0) {
      throw new Error('TaskId cannot be empty');
    }
    return new TaskId(value);
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: TaskId): boolean {
    return this.value === other.value;
  }
}
