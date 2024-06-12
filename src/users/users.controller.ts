import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ParseIntPipe,ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Role
 } from 'src/decorators/roles.decorator';
@Role("admin")
@UseGuards(AuthenticationGuard,AuthorizationGuard)

@Controller('users')
export class UsersController {
  /*  GET /users
   GET /users/:id
   POST /users
   PATCH /users:id
   DELETE /users:id

   */
  constructor(private readonly userService: UsersService) {}
  @Get() //GET /users or /users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.userService.findAll(role);
  }

  @Get(':id') //GET/users/:id
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }
  @Post()
  create(
    @Body(ValidationPipe)
    createUserDto:CreateUserDto
  ) {
    return this.userService.create(createUserDto);
  }
  @Patch(':id')
  update(
    @Param('id',ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateUserDto:UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }
  @Delete(':id') //GET/users/:id
  delete(@Param('id',ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
