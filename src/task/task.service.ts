import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { TaskEntity } from "./task.entity";

@Injectable()
export class TaskService {
 constructor(
  @InjectRepository(TaskEntity)
  private taskRepository: Repository<TaskEntity>
  ) { }

  async findAll(): Promise<TaskEntity[]> {
      return await this.taskRepository.find();
  }

  async getById(id): Promise<TaskEntity> {
    return await this.taskRepository.findOne(
        { where:
            { id: id}
        }
    );
  }

  async create(user: TaskEntity): Promise<any> {
    return await this.taskRepository.save(user);
  }

  async updateTaskStatus(taskId: any, status: boolean) {
    const task = await this.getById(taskId);
    task.isAvailable = status;
    
    await this.taskRepository.update(taskId, task)
  }
}
