import { InputType, PartialType } from '@nestjs/graphql';
import { CreateColumnInput } from './create-column.input';

@InputType()
export class UpdateColumnInput extends PartialType(CreateColumnInput) {}
