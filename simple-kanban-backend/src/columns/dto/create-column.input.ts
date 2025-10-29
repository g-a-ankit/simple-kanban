import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateColumnInput {
  @Field()
  title: string;

  @Field()
  boardId: string;

  @Field(() => Int, { nullable: true })
  position?: number;
}
