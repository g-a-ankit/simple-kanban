import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // ✅ Create a new user
  async create(createUserDto: CreateUserInput) {
    const { name, email, password } = createUserDto;

    // Hash password before saving
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: { name, email, passwordHash },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return user;
  }

  // ✅ Fetch all users
  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        ownedBoards: {
          select: { id: true, title: true },
        },
      },
    });
  }

  // ✅ Fetch a single user by ID
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        ownedBoards: true,
        memberBoards: {
          include: { board: true },
        },
        assignedTasks: true,
        comments: true,
      },
    });

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  // ✅ Update user info (except password)
  async update(id: string, updateUserDto: UpdateUserInput) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        name: true,
        email: true,
        updatedAt: true,
      },
    });
    return user;
  }

  // ✅ Delete user
  async remove(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
    return { message: `User with ID ${id} deleted successfully` };
  }
}
