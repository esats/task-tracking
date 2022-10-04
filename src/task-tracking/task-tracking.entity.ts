import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TaskTrackingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskId: number;

  @Column()
  userId: number;

  @Column()
  description: string;

  @Column({
    nullable: true
  }) 
  startDate: Date;

  @Column({
    nullable: true
  }) 
  endDate: Date;
}
