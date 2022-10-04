import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';


@Injectable()
export class UserMockService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
      ) { }
    
    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async getById(id): Promise<UserEntity> {
        return await this.userRepository.findOne(
            { where:
                { id: id}
            }
        );
    }

    async create(user: UserEntity): Promise<any> {
        return await this.userRepository.save(user);
    }
}