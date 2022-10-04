import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskEntity } from './task.entity';
import { Result, SuccessResult } from 'src/models/Result';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async tasks(): Promise<Result<any>>  {
    const res = await this.taskService.findAll();
    return new SuccessResult({ res });
  }

  @Get(':id')
  async getTaskById(@Param() param): Promise<Result<any>> {
    const res = await this.taskService.getById(param.id);
    return new SuccessResult({ res });
  }

  @Post('create')
  async create(@Body() entitytData: TaskEntity): Promise<any> {
    const res = await this.taskService.create(entitytData);
    return new SuccessResult({ res });
  }
}
