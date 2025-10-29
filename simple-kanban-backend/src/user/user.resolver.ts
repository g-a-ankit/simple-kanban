import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  createUser(@Args('createUserDto') createUserDto: CreateUserInput) {
    return this.userService.create(createUserDto);
  }

  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateUserDto') updateUserDto: UpdateUserInput,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id', { type: () => ID }) id: string) {
    await this.userService.remove(id);
    return true;
  }
}
