import { registerEnumType } from '@nestjs/graphql';
import { TaskStatus as PrismaTaskStatus } from '@prisma/client';

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

// Register it with GraphQL
registerEnumType(TaskStatus, {
  name: 'TaskStatus',
});
