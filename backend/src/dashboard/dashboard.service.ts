import { Injectable } from '@nestjs/common';
import { EmployeesService } from '../employees/employees.service';
import { DepartmentsService } from '../departments/departments.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly departmentsService: DepartmentsService,
  ) {}

  async getDashboardStats() {
    const employees = await this.employeesService.findAll();
    const departments = await this.departmentsService.findAll();
    const employeeStats = await this.employeesService.getStatistics();

    // Calculate statistics
    const totalEmployees = employeeStats.total;
    const newEmployees = employees.filter((emp) => {
      const hireDate = new Date(emp.hireDate);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return hireDate >= thirtyDaysAgo;
    }).length;

    // Available positions (mock data for now)
    const availablePositions = 24;
    const urgentlyNeeded = 4;
    const jobsOpen = 10;
    const activeHiring = 4;

    // Talent requests
    const talentRequests = 16;
    const menEmployees = employeeStats.byGender.male;
    const womenEmployees = employeeStats.byGender.female;

    return {
      availablePositions: {
        total: availablePositions,
        urgentlyNeeded,
      },
      jobsOpen: {
        total: jobsOpen,
        activeHiring,
      },
      newEmployees: {
        total: newEmployees,
        departmentCount: 4,
      },
      totalEmployees: {
        total: totalEmployees,
        men: menEmployees,
        women: womenEmployees,
        changePercentage: 2,
      },
      talentRequests: {
        total: talentRequests,
        men: 6,
        women: 10,
        changePercentage: 5,
      },
      recentActivity: [
        {
          id: '1',
          title: 'You Posted a New Job',
          description:
            'Kindly check the requirements and terms of work and make sure everything is right.',
          time: '19:49 AM, [+1 Sept 2021]',
          type: 'job',
        },
      ],
      upcomingSchedules: [
        {
          id: '1',
          title: 'Review candidate applications',
          time: 'Today · 11:30 AM',
          priority: 'Priority',
          type: 'review',
        },
        {
          id: '2',
          title: 'Interview with candidates',
          time: 'Today · 10:30 AM',
          priority: 'Other',
          type: 'interview',
        },
        {
          id: '3',
          title: 'Short meeting with product designer from IT Department',
          time: 'Today · 09:15 AM',
          priority: 'Other',
          type: 'meeting',
        },
      ],
      announcements: [
        {
          id: '1',
          title: 'Outing schedule for every departement',
          time: '5 Minutes ago',
        },
        {
          id: '2',
          title: 'Meeting HR Department',
          time: 'Yesterday, 12:30 PM',
        },
        {
          id: '3',
          title: 'IT Department need two more talents for UX/UI Designer position',
          time: 'Yesterday, 09:15 AM',
        },
      ],
    };
  }
}
