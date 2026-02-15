import mongoose, { Schema } from 'mongoose';

export interface TaskDocument {
  id: string;
  title: string;
  description?: string;
  status: string;
  createdAt: Date;
}

const taskSchema = new Schema<TaskDocument>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: String, required: true },
    createdAt: { type: Date, required: true },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export const TaskModel = mongoose.model<TaskDocument>('Task', taskSchema);
