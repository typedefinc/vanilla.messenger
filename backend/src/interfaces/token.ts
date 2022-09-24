import UserDto from '../../prisma/dto/user/userDto';

export interface ResponseTokenType {
  refreshToken: string,
  accessToken: string,
  user: UserDto
}