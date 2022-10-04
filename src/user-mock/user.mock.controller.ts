import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Result, SuccessResult } from 'src/models/Result';
import { UserEntity } from './user.entity';
import { UserMockService } from './user.mock.service';

@Controller("users")
export class UserMockController {
  constructor(private readonly userMockService: UserMockService) {}

  @Get()
  async users(): Promise<Result<any>> {
    const res = await this.userMockService.findAll();
    return new SuccessResult({ res });
  }

  @Get(':userId')
  async getUserById(@Param() param): Promise<Result<any>> {
    const res = await this.userMockService.getById(param.userId)
    return new SuccessResult({ res });
  }

  @Post('create')
  async create(@Body() entitytData: UserEntity): Promise<Result<any>> {
    const res = await this.userMockService.create(entitytData)
    return new SuccessResult({ res });
  }
}
