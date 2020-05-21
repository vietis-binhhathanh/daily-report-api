import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../@core/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDTO, RegisterDTO } from '../../@core/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { Constant } from '../../@core/constant/constant';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {
  }

  /**
   * User register
   * @param credentials
   */
  async register(credentials: RegisterDTO) {
    try {
      const user = this.userRepository.create(credentials);
      await user.save();

      return { user: { ...user.toJSON() } };
    } catch (error) {
      if (error.code === Constant.ERROR_SQL_CONFLICT_CODE) {
        throw new ConflictException(Constant.EMAIL_DUPLICATE);
      }

      throw new InternalServerErrorException();
    }
  }

  /**
   * User logging, check authentication
   * @param email
   * @param password
   */
  async login({ email, password }: LoginDTO) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      const isValid = await user.comparePassword(password);
      if (!isValid) {
        throw new UnauthorizedException(Constant.INVALID_LOGIN_PARAM);
      }
      const payload = { email: user.email };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

      return { user: { ...user.toJSON() }, accessToken: { token } };
    } catch (error) {
      throw new UnauthorizedException(Constant.INVALID_LOGIN_PARAM);
    }
  }
}
