import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ColumnsService } from './columns.service';
import { Column } from './entities/columns.entity';
import { CreateColumnInput } from './dto/create-column.input';
import { UpdateColumnInput } from './dto/update-column.input';

@Resolver(() => Column)
export class ColumnsResolver {
  constructor(private readonly columnsService: ColumnsService) {}

  @Query(() => [Column], { name: 'columns' })
  findAll() {
    return this.columnsService.findAll();
  }

  @Query(() => Column, { name: 'column' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.columnsService.findOne(id);
  }

  @Mutation(() => Column)
  createColumn(@Args('createColumnDto') createColumnDto: CreateColumnInput) {
    return this.columnsService.create(createColumnDto);
  }

  @Mutation(() => Column)
  updateColumn(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateColumnDto') updateColumnDto: UpdateColumnInput,
  ) {
    return this.columnsService.update(id, updateColumnDto);
  }

  @Mutation(() => Boolean)
  async removeColumn(@Args('id', { type: () => ID }) id: string) {
    await this.columnsService.remove(id);
    return true;
  }
}
