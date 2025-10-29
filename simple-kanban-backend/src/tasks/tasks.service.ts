import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskInput) {
    const {
      title,
      description,
      status = TaskStatus.TODO,
      columnId,
      position,
    } = createTaskDto;

    // if position not provided, compute it as max(position)+1 in that column
    const computedPosition =
      position ??
      (await this.prisma.task
        .findMany({
          where: { columnId },
          select: { position: true },
          orderBy: { position: 'desc' },
          take: 1,
        })
        .then((rows) => (rows.length ? rows[0].position + 1 : 1)));

    const task = await this.prisma.task.create({
      data: {
        title,
        description,
        status,
        position: computedPosition || 0,
        column: { connect: { id: columnId } },
      },
    });

    this.logger.log(`Created task ${task.id} in column ${columnId}`);
    return task;
  }

  async findAll() {
    this.logger.log('Fetching all tasks');
    return this.prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        column: {
          include: {
            board: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    this.logger.log(`Fetching task with ID: ${id}`);

    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        column: {
          include: {
            board: true,
          },
        },
      },
    });

    if (!task) {
      this.logger.warn(`Task with ID ${id} not found`);
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskInput) {
    this.logger.log(`Updating task with ID: ${id}`);

    const existing = await this.prisma.task.findUnique({ where: { id } });
    if (!existing) {
      this.logger.warn(`Cannot update — Task with ID ${id} not found`);
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const updated = await this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });

    this.logger.debug(`Task with ID ${id} updated successfully`);
    return updated;
  }

  async remove(id: string) {
    this.logger.log(`Deleting task with ID: ${id}`);

    const existing = await this.prisma.task.findUnique({ where: { id } });
    if (!existing) {
      this.logger.warn(`Cannot delete — Task with ID ${id} not found`);
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.prisma.task.delete({ where: { id } });
    this.logger.debug(`Task with ID ${id} deleted successfully`);

    return { message: `Task with ID ${id} deleted` };
  }
}
