import { prisma } from '../../index';
import * as bcrypt from 'bcrypt';
import UserDto from '../../../prisma/dto/user/userDto';
import tokenService from './tokenService';

class UserService {

  async signup(login: string, password: string) {
    const candidate = await prisma.user.findUnique({
      where: {
        login: login
      }
    });

    if (candidate) {
      throw new Error('User is already register');
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const user = await prisma.user.create({
      data: {
        login: login,
        password: hashPassword
      }
    });
    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto
    }
  }
}

export default new UserService();