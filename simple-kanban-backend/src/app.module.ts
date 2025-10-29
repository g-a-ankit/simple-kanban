import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PrismaModule } from './prisma/prisma.module';
import { ColumnsModule } from './columns/columns.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    UserModule,
    BoardsModule,
    TasksModule,
    AuthModule,
    NotificationsModule,
    PrismaModule,
    ColumnsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // auto-generate schema
      playground: true, // enable GraphQL Playground
      path: '/graphql', //
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
