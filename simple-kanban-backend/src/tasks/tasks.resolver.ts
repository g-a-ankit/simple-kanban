import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './entities/tasks.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(() => [Task], { name: 'tasks' })
  findAll() {
    return this.tasksService.findAll();
  }

  @Query(() => Task, { name: 'task' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.tasksService.findOne(id);
  }

  @Mutation(() => Task)
  createTask(@Args('createTaskDto') createTaskDto: CreateTaskInput) {
    return this.tasksService.create(createTaskDto);
  }

  @Mutation(() => Task)
  updateTask(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateTaskDto') updateTaskDto: UpdateTaskInput,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Mutation(() => Boolean)
  async removeTask(@Args('id', { type: () => ID }) id: string) {
    await this.tasksService.remove(id);
    return true;
  }
}
