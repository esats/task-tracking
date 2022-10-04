import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/task/task.entity';
import { TaskService } from 'src/task/task.service';
import { UserEntity } from 'src/user-mock/user.entity';
import { UserMockService } from 'src/user-mock/user.mock.service';
import { TaskTrackingController } from './task-tracking.controller';
import { TaskTrackingEntity } from './task-tracking.entity';
import { TaskTrackingService } from './task-tracking.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskTrackingEntity,TaskEntity, UserEntity])],
  controllers: [TaskTrackingController],
  providers: [TaskTrackingService, TaskService, UserMockService],
})
export class TaskTrackingModule {}
