import express from 'express';
import type { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app: Express = express();
app.use(express.json());
app.use(cors());
const PORT: number = 8080;

const prisma = new PrismaClient();

// Get all todos
app.get('/', async (req: Request, res: Response) => {
  try {
    const allTodo = await prisma.todo.findMany();
    return res.json(allTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Create a new todo
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

// edit a todo
app.put('/edit/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, isCompleted } = req.body;
    const editTodo = await prisma.todo.update({
      where: { id },
      data: {
        title,
        isCompleted,
      },
    });
    return res.json(editTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// delete a todo
app.delete('/delete/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleteTodo = await prisma.todo.delete({
      where: { id },
    });
    return res.json(deleteTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
