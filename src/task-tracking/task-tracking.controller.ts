import { Body, Controller, Get, Post } from '@nestjs/common';
import { Result, SuccessResult } from 'src/models/Result';
import { TaskTrackingStartModel } from 'src/models/task-tracking-start-model';
import { TaskTrackingStopModel } from 'src/models/task-tracking-stop-model';
import { TaskTrackingService } from './task-tracking.service';

@Controller('task-tracking')
export class TaskTrackingController {
  constructor(private readonly taskTrackingService: TaskTrackingService) {}

  @Post("startTask")
  async startTask(@Body() model: TaskTrackingStartModel): Promise<Result<any>> {
    var res = await this.taskTrackingService.startTask(model);
    return new SuccessResult({ res });
  } 

  @Post("stopTask")
  async stopTask(@Body() model: TaskTrackingStopModel): Promise<Result<any>> {
    var res = await this.taskTrackingService.stopTask(model);
    return new SuccessResult({ res });
  }

  @Get("getWorkingHistory")
  async getUserWorkingHistory(): Promise<Result<any>> {
    return this.taskTrackingService.getUserWorkingHistory();
  }
}
