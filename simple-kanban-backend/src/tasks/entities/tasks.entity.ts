import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column } from '../../columns/entities/columns.entity';
import { User } from '../../user/entities/user.entity';
import { TaskStatus } from '../tasks.enum';

@ObjectType()
export class Task {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  status?: TaskStatus;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => Column, { nullable: true })
  column?: Column;

  @Field(() => User, { nullable: true })
  assignedTo?: User;
}
