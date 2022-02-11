import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Todo } from "../models/Todo";
import { CreateTodoInput } from "../inputs/CreateToDoInput";
import { UpdateTodoInput } from "../inputs/UpdateToDoInput";

@Resolver()
export class TodoResolver {
    @Query(() => [Todo])
    todos() {
        return Todo.find()
    }
    @Query(() => Todo)
    todo(@Arg("id") id: string) {
        return Todo.findOne({ where: { id } });
    }

    @Mutation(() => Todo)
    async createTodo(@Arg("data") data: CreateTodoInput) {
        const todo = Todo.create(data);
        await todo.save();
        return todo;
    }
    @Mutation(() => Todo)
    async updateTodo(@Arg("id") id: string, @Arg("data") data: UpdateTodoInput) {
        const todo = await Todo.findOne({ where: { id } });
        if (!todo) throw new Error("Book not found!");
        Object.assign(todo, data);
        await todo.save();
        return todo;
    }
    @Mutation(() => Boolean)
    async deleteTodo(@Arg("id") id: string) {
        const todo = await Todo.findOne({ where: { id } });
        if (!todo) throw new Error("Book not found!");
        await todo.remove();
        return true;
    }
}