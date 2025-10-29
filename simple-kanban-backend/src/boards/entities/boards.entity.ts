import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column } from '../../columns/entities/columns.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Board {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => User, { nullable: true })
  owner?: User;

  @Field(() => [Column], { nullable: true })
  columns?: Column[];
}
