import { Injectable, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { threadId } from 'worker_threads';
@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Usaid Asif', email: 'usaida863@gmail.com', role: 'ADMIN' },
    {
      id: 2,
      name: 'Ahmed Siddiqui',
      email: 'ahmed12@gmail.com',
      role: 'INTERN',
    },
    { id: 3, name: 'Lassi', email: 'lassi7@gmail.com', role: 'ENGINEER' },
  ];
  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const UserRoles=this.users.filter((user) => user.role === role);
      if (UserRoles.length===0){
         throw new NotFoundException("Role doesnot exist")
      }
      else{
        return UserRoles
      }
    }
    
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException("User not found")
    return user
  }
  create(createUserDto:CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(
    id: number,
    updateUserDto:UpdateUserDto
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }
  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
