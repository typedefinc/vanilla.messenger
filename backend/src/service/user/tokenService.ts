import jwt from 'jsonwebtoken';
import { prisma } from '../../index';

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken,
    }
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await prisma.token.findUnique({
      where: {
        userId: userId
      }
    });

    if (tokenData) {
      return tokenData.refreshToken = refreshToken;
    }

    return await prisma.token.create({
      data: {
        userId: userId,
        refreshToken: refreshToken,
      }
    });
  }

  async removeToken(refreshToken: string) {
    return await prisma.token.deleteMany({
      where: {
        refreshToken
      }
    });
  }

  async findToken(refreshToken: string) {
    return await prisma.token.findFirst({
      where: {
        refreshToken
      }
    });
  }

  async validateAccessToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (e) {
      return null;
    }
  }

  async validateRefreshToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();