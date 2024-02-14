import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain";

export class TodosController {
  //* DI
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    return res.json(todos);
  };
  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ message: "ID armument must be a number" });
    // const todo = await todos.find((todo) => todo.id === id);
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });
    todo
      ? res.json(todo)
      : res.status(404).json({ message: `TODO WHIT id: ${id} not found` });
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error,createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({ message: error });

    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ message: "ID armument must be a number" });
    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });
    if (!todo)
      return res.status(404).json({ message: `TODO WHIT id: ${id} not found` });
    const { text, completedAt } = req.body;
    const updatedTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        text,
        completedAt: completedAt ? new Date(completedAt) : null,
      },
    });
    res.json(updatedTodo);
  };
  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ message: "ID armument must be a number" });
    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });
    if (!todo)
      return res.status(404).json({ message: `TODO WHIT id: ${id} not found` });
    const eliminated = await prisma.todo.delete({
      where: {
        id,
      },
    });
    eliminated
      ? res.json(eliminated)
      : res
          .status(400)
          .json({ message: `TODO WHIT id: ${id} ya fue eliminado` });
  };
}
