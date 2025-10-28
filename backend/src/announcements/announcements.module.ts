import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Announcement } from './entities/announcement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Announcement])],
  controllers: [],
  providers: [],
  exports: [],
})
export class AnnouncementsModule {}
