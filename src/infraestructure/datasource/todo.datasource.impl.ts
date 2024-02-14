import { prisma } from "../../data/postgres"
import { CreateTodoDto,TodoDataSource, TodoEntity, UpdateTodoDto } from "../../domain"

export class TodoDatasourceImpl implements TodoDataSource {
    async create(CreateTodoDto:CreateTodoDto): Promise<TodoEntity> {
        const todo=await prisma.todo.create({data:CreateTodoDto!})
        return TodoEntity.fromObject(todo)
    }
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany()
        return todos.map((todo) => TodoEntity.fromObject(todo))

    }
    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findUnique({ where: { id } })
        if (!todo) throw new Error("Todo not found")
        return TodoEntity.fromObject(todo)

    }
    async updateById(updateTodoDto:UpdateTodoDto): Promise<TodoEntity> {
        const todo=await this.findById(updateTodoDto.id)
        const updateTodo=await prisma.todo.update({where:{id:updateTodoDto.id},data:updateTodoDto!.values})
        return TodoEntity.fromObject(updateTodo)
    }
    async deleteById(id: number): Promise<TodoEntity> {
        const todo= await this.findById(id)
        const deleted=await prisma.todo.delete({where:{id}})
        return TodoEntity.fromObject(deleted)
    }
    
}