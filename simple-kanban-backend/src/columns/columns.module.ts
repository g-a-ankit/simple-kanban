import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ColumnsResolver } from './columns.resolver';

@Module({
  providers: [ColumnsService, PrismaService, ColumnsResolver],
})
export class ColumnsModule {}
