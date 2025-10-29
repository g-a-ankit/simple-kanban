import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateColumnInput } from './dto/create-column.input';
import { UpdateColumnInput } from './dto/update-column.input';

@Injectable()
export class ColumnsService {
  private readonly logger = new Logger(ColumnsService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new column within a board
   */
  async create(createColumnDto: CreateColumnInput) {
    const { title, boardId, position } = createColumnDto;

    // Compute next position if not provided
    const nextPosition =
      position ??
      (await this.prisma.column
        .findMany({
          where: { boardId },
          orderBy: { position: 'desc' },
          take: 1,
        })
        .then((cols) => (cols.length ? cols[0].position + 1 : 1)));

    const column = await this.prisma.column.create({
      data: {
        title,
        position: nextPosition || 0,
        boardId,
      },
    });

    this.logger.log(`Created new column "${title}" in board ${boardId}`);
    return column;
  }

  /**
   * Get all columns (optionally filter by board)
   */
  async findAll(boardId?: string) {
    this.logger.log('Fetching columns');
    return this.prisma.column.findMany({
      where: boardId ? { boardId } : undefined,
      orderBy: { position: 'asc' },
      include: { tasks: true }, // include tasks if needed
    });
  }

  /**
   * Get single column by id
   */
  async findOne(id: string) {
    const column = await this.prisma.column.findUnique({
      where: { id },
      include: { tasks: true },
    });

    if (!column) {
      throw new NotFoundException(`Column with id ${id} not found`);
    }

    return column;
  }

  /**
   * Update a column
   */
  async update(id: string, updateColumnDto: UpdateColumnInput) {
    const column = await this.prisma.column.findUnique({ where: { id } });
    if (!column) {
      throw new NotFoundException(`Column with id ${id} not found`);
    }

    const updated = await this.prisma.column.update({
      where: { id },
      data: updateColumnDto,
    });

    this.logger.log(`Updated column "${updated.title}" (${id})`);
    return updated;
  }

  /**
   * Delete a column (and cascade delete tasks)
   */
  async remove(id: string) {
    const column = await this.prisma.column.findUnique({ where: { id } });
    if (!column) {
      throw new NotFoundException(`Column with id ${id} not found`);
    }

    await this.prisma.column.delete({ where: { id } });
    this.logger.log(`Deleted column ${id}`);

    return { message: `Column ${id} deleted successfully` };
  }
}
