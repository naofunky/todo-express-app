import express from 'express';
import type { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app: Express = express();
const PORT: number = 8080;

const prisma = new PrismaClient();

app.get('/', async (req: Request, res: Response) => {
  const allTodo = await prisma.todo.findMany();
  return res.json(allTodo);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
