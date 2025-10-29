import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBoardDto: CreateBoardInput) {
    const { title, description, ownerId } = createBoardDto;

    if (!title || !ownerId) {
      throw new BadRequestException('Title and ownerId are required.');
    }

    const board = await this.prisma.board.create({
      data: {
        title,
        description,
        ownerId,
      },
    });

    return board;
  }

  async findAll(ownerId?: string) {
    if (ownerId) {
      return this.prisma.board.findMany({
        where: {
          OR: [{ ownerId }],
        },
        include: {
          owner: true,
          columns: {
            include: {
              tasks: true,
            },
          },
        },
      });
    }

    return this.prisma.board.findMany({
      include: {
        owner: true,
        columns: {
          include: { tasks: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const board = await this.prisma.board.findUnique({
      where: { id },
      include: {
        owner: true,
        columns: true,
      },
    });

    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found.`);
    }

    return board;
  }

  async update(id: string, updateBoardDto: UpdateBoardInput) {
    const board = await this.prisma.board.findUnique({ where: { id } });
    if (!board) throw new NotFoundException(`Board with ID ${id} not found.`);

    // const updated = await this.prisma.board.update({
    //   where: { id },
    //   data: updateBoardDto,
    // });

    // return updated;
  }

  async remove(id: string) {
    const board = await this.prisma.board.findUnique({ where: { id } });
    if (!board) throw new NotFoundException(`Board with ID ${id} not found.`);

    await this.prisma.board.delete({ where: { id } });
    return { message: `Board ${id} deleted successfully.` };
  }
}
