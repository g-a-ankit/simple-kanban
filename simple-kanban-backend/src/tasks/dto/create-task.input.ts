import { InputType, Field, Int } from '@nestjs/graphql';
import { TaskStatus } from '../tasks.enum';

@InputType()
export class CreateTaskInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => TaskStatus, { nullable: true })
  status?: TaskStatus;

  @Field()
  columnId: string; // FK to Column

  @Field(() => Int, { nullable: true })
  position?: number; // optional
}
