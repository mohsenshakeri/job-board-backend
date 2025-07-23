import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {


  }
  /**
     * Finds a user by email
     */
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }


  /**
   * Creates a new user
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  /**
   * Return all users (admin only)
   */
  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: ['id', 'email', 'role', 'createdAt'],
      order: { createdAt: 'DESC' },
    });
  }


   async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'email', 'role', 'createdAt'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }


async update(id: number, dto: UpdateUserDto): Promise<any> {
  const user = await this.usersRepository.findOne({ where: { id } });

  if (!user) throw new NotFoundException('User not found');

  // Only hash if password is provided
  if (dto.password) {
    dto.password = await bcrypt.hash(dto.password, 10);
  }

  await this.usersRepository.update(id, dto);
  return { message: 'User updated successfully' };
}


async changePassword(userId: number, dto: UpdatePasswordDto) {
  const user = await this.usersRepository.findOne({ where: { id: userId } });
  if (!user) throw new NotFoundException('User not found');

  const isMatch = await bcrypt.compare(dto.currentPassword, user.password);
  if (!isMatch) {
    throw new BadRequestException('Current password is incorrect');
  }

  const hashedNew = await bcrypt.hash(dto.newPassword, 10);
  await this.usersRepository.update(userId, { password: hashedNew });

  return { message: 'Password updated successfully' };
}

}
