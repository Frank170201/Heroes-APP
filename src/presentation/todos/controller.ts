import { Request, Response } from "express";

const todos = [
  {
    id: 1,
    text: "Buy milk",
    createdAt: new Date(),
  },
  {
    id: 2,
    text: "Buy chicken",
    createdAt: null,
  },
  {
    id: 3,
    text: "Buy fruits",
    createdAt: new Date(),
  },
];
export class TodosController {
  //* DI
  constructor() {}
  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };
  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if(isNaN(id)) return res.status(400).json({ message: 'ID armument must be a number'});
    const todo = todos.find((todo) => todo.id === id);
    (todo) ? res.json(todo) : res.status(404).json({ message: `TODO WHIT id: ${id} not found` });
  };

  public createTodo = (req: Request, res: Response) => {
    const {text}=req.body;
    if(!text) return res.status(400).json({ message: 'text is required'});
    const newTodo =({
      id: todos.length + 1,
      text,
      createdAt: null,
    });
    todos.push(newTodo);
    res.json(newTodo)
  }

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if(isNaN(id)) return res.status(400).json({ message: 'ID armument must be a number'});
    const {text,createdAt}=req.body;
    const todo = todos.find((todo) => todo.id === id);
    if(!todo) return res.status(404).json({ message: `TODO WHIT id: ${id} not found` });
    todo.text = text || todo.text;
    (createdAt==="null") ? todo.createdAt = null : todo.createdAt = new Date(createdAt||todo.createdAt);
    res.json(todo);
  }
  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if(isNaN(id)) return res.status(400).json({ message: 'ID armument must be a number'});
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if(todoIndex===-1) return res.status(404).json({ message: `TODO WHIT id: ${id} not found` });
    const eliminated=todos.splice(todoIndex,1);
    res.json({message:`TODO WHIT id: ${id} was deleted`,eliminated});

  }
}
