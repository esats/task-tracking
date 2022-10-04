import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskTrackingStartModel } from 'src/models/task-tracking-start-model';
import { TaskTrackingStopModel } from 'src/models/task-tracking-stop-model';
import { TaskService } from 'src/task/task.service';
import { UserMockService } from 'src/user-mock/user.mock.service';
import { IsNull, Not, Repository, Unique } from 'typeorm';
import { TaskTrackingEntity } from './task-tracking.entity';
import { DataSource } from "typeorm";
import { WorkingHistoryModel } from 'src/models/working-history-model';

@Injectable()
export class TaskTrackingService {
  constructor(
    @InjectRepository(TaskTrackingEntity)
    private taskTrackingRepository: Repository<TaskTrackingEntity>,
    private readonly taskService : TaskService,
    private readonly userService : UserMockService,
    ){}

  async startTask(model: TaskTrackingStartModel): Promise<any> {
      const willStartTask = await this.taskService.getById(model.taskId);
      if(!willStartTask){
        return "Task not found.";
      }

      if (!willStartTask.isAvailable) {
        return "Task is not available to start.";
      }

      const checkUserTask = await this.taskTrackingRepository.findOneBy({
        userId: model.userId,
        endDate: IsNull()
      })
    
      if (checkUserTask){
        return "User has task. Stop other task.";
      }

      const taskTrackingEntity = this.taskTrackingRepository.create({
        userId: model.userId,
        taskId: model.taskId,
        description: model.description,
        startDate: new Date()
      });

      await this.taskTrackingRepository.save(taskTrackingEntity);

      await this.taskService.updateTaskStatus(model.taskId,false);

      return "task started";
  }

  async stopTask(model: TaskTrackingStopModel): Promise<any> {
    const willStopTask = await this.taskService.getById(model.taskId);
    if(!willStopTask){
      return "Task not found.";
    }

    if (willStopTask.isAvailable) {
      return "Task is not available to stop.";
    }

    let checkUserTask = await this.taskTrackingRepository.findOneBy({
      userId: model.userId,
      endDate: Not(null),
    })
    
    if (checkUserTask){
      return "User has not task.";
    }

    checkUserTask = await this.taskTrackingRepository.findOneBy({
      userId: model.userId,
      endDate: IsNull(),
    })

    checkUserTask.endDate = new Date();
    await this.taskTrackingRepository.update(checkUserTask.id, checkUserTask);

    await this.taskService.updateTaskStatus(model.taskId,true);

    return "task stopped";
  }

  async getUserWorkingHistory(): Promise<any> {
    const taskTrackings = (await this.taskTrackingRepository.find()).sort(x=>x.startDate.getDate());
    const users = await this.userService.findAll();
    const days = [];
    var response = [];

    for(let i = 0; i < taskTrackings.length; i++) {
        days.push(taskTrackings[i].startDate.toLocaleDateString());  
    }
    const uniqueDays = days.filter((v, i, a) => a.indexOf(v) === i);

    for(let i = 0; i < uniqueDays.length; i++) {
      for(let j = 0; j < users.length; j++) {
        var data = taskTrackings
                .filter(x=>x.startDate.toLocaleDateString() == uniqueDays[i] && users[j].id == x.userId)
                .map((item) => {
                  return new WorkingHistoryModel({
                    userId: users[j].id,
                    user: users[j].name + " " + users[j].surname,
                    description: item.description,
                    startDate: item.startDate,
                    endDate: item.endDate 
                }); 
            });
         var index = response.findIndex(p => p.date == uniqueDays[i]);
         if(index != -1){
            response[index].items.push(data);
         }else{
          response.push({
            date: uniqueDays[i],
            items: [data]
           });
         }  
      }
    }

    return JSON.stringify(response);
  }
}

