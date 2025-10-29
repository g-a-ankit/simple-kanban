import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Task } from '../../tasks/entities/tasks.entity';
import { Board } from '../../boards/entities/boards.entity';

@ObjectType()
export class Column {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => Int)
  position: number;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => Board, { nullable: true })
  board?: Board;

  @Field(() => [Task], { nullable: true })
  tasks?: Task[];
}
