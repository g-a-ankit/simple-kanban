import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { Board } from './entities/boards.entity';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';

@Resolver(() => Board)
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Query(() => [Board], { name: 'boards' })
  findAll() {
    return this.boardsService.findAll();
  }

  @Query(() => Board, { name: 'board' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.boardsService.findOne(id);
  }

  @Mutation(() => Board)
  createBoard(@Args('createBoard') createBoardDto: CreateBoardInput) {
    return this.boardsService.create(createBoardDto);
  }

  @Mutation(() => Board)
  updateBoard(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateBoardDto') updateBoardDto: UpdateBoardInput,
  ) {
    return this.boardsService.update(id, updateBoardDto);
  }

  @Mutation(() => Boolean)
  async removeBoard(@Args('id', { type: () => ID }) id: string) {
    await this.boardsService.remove(id);
    return true;
  }
}
