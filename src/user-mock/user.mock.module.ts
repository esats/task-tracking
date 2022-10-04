import { Module } from '@nestjs/common';
import { UserMockController } from './user.mock.controller';
import { UserMockService } from './user.mock.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserMockController],
  providers: [UserMockService],
})
export class UserMockModule {}
