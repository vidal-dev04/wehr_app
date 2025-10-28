import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { EmployeesModule } from '../employees/employees.module';
import { DepartmentsModule } from '../departments/departments.module';

@Module({
  imports: [EmployeesModule, DepartmentsModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
