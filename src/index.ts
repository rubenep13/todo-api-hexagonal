import { Server } from './infrastructure/http/Server.js';
import { connectDatabase } from './infrastructure/config/database.js';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todo-api';

async function main(): Promise<void> {
  try {
    await connectDatabase(MONGO_URI);

    const server = new Server();
    server.start(PORT);
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}

main();
