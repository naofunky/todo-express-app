import express from 'express';
import type { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app: Express = express();
app.use(express.json());
const PORT: number = 8080;

const prisma = new PrismaClient();

app.get('/', async (req: Request, res: Response) => {
  try {
    const allTodo = await prisma.todo.findMany();
    return res.json(allTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.post('/create', async (req: Request, res: Response) => {
  try {
    const { title, isCompleted } = req.body;
    const createTodo = await prisma.todo.create({
      data: {
        title,
        isCompleted,
      },
    });
    return res.json(createTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
