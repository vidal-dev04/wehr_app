import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Department } from '../../departments/entities/department.entity';

export enum JobStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  ON_HOLD = 'on_hold',
}

export enum JobPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent',
}

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: JobStatus,
    default: JobStatus.OPEN,
  })
  status: JobStatus;

  @Column({
    type: 'enum',
    enum: JobPriority,
    default: JobPriority.NORMAL,
  })
  priority: JobPriority;

  @Column({ default: 1 })
  positions: number;

  @Column({ type: 'text', array: true, default: [] })
  requirements: string[];

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salaryMin: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salaryMax: number;

  @Column({ type: 'date', nullable: true })
  deadline: Date;

  @ManyToOne(() => Department, { nullable: true })
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @Column({ nullable: true })
  departmentId: string;

  @Column({ default: 0 })
  applicantsCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
