import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum AnnouncementPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent',
}

@Entity('announcements')
export class Announcement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({
    type: 'enum',
    enum: AnnouncementPriority,
    default: AnnouncementPriority.NORMAL,
  })
  priority: AnnouncementPriority;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isPinned: boolean;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column({ nullable: true })
  authorId: string;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
