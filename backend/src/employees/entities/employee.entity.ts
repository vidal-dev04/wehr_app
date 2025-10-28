import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Department } from '../../departments/entities/department.entity';
import { User } from '../../users/entities/user.entity';

export enum EmploymentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ON_LEAVE = 'on_leave',
  TERMINATED = 'terminated',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender: Gender;

  @Column()
  position: string;

  @Column({ type: 'date' })
  hireDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salary: number;

  @Column({
    type: 'enum',
    enum: EmploymentStatus,
    default: EmploymentStatus.ACTIVE,
  })
  status: EmploymentStatus;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  avatar: string;

  @ManyToOne(() => Department, (department) => department.employees, {
    nullable: true,
  })
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @Column({ nullable: true })
  departmentId: string;

  @OneToOne(() => User, (user) => user.employee, { nullable: true })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
