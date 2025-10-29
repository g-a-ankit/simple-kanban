import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsResolver } from './boards.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [BoardsService, BoardsResolver, PrismaService],
})
export class BoardsModule {}
