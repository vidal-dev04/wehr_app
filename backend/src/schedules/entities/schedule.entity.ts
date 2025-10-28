import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

export enum SchedulePriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
}

export enum ScheduleType {
  MEETING = 'meeting',
  INTERVIEW = 'interview',
  REVIEW = 'review',
  TRAINING = 'training',
  OTHER = 'other',
}

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ScheduleType,
    default: ScheduleType.MEETING,
  })
  type: ScheduleType;

  @Column({
    type: 'enum',
    enum: SchedulePriority,
    default: SchedulePriority.NORMAL,
  })
  priority: SchedulePriority;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTime: Date;

  @Column({ nullable: true })
  location: string;

  @ManyToOne(() => Employee, { nullable: true })
  @JoinColumn({ name: 'assignedToId' })
  assignedTo: Employee;

  @Column({ nullable: true })
  assignedToId: string;

  @Column({ default: false })
  isCompleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
