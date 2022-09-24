import { prisma } from '../../index';
import * as bcrypt from 'bcrypt';
import UserDto from '../../../prisma/dto/user/userDto';
import tokenService from './tokenService';
import ApiError from '../../exceptions/apiError';
import { JwtPayload } from 'jsonwebtoken';

class UserService {

  async signup(login: string, password: string, email: string) {
    const candidate = await prisma.user.findUnique({
      where: {
        login: login
      }
    });

    if (candidate) {
      throw ApiError.BadRequest('User is already register');
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const user = await prisma.user.create({
      data: {
        login: login,
        password: hashPassword,
        email: email,
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

  async login(login: string, password: string) {
    const user = await prisma.user.findUnique({
      where: {
        login: login
      }
    });

    if (!user) {
      throw ApiError.BadRequest('User is not register');
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest('Login or password is incorrect!');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto
    }
  }

  async logout(refreshToken: string) {
    return await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData: JwtPayload = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userData.id
      }
    })
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