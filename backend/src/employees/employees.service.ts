import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee, EmploymentStatus, Gender } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    // Check if email already exists
    const existingEmployee = await this.employeeRepository.findOne({
      where: { email: createEmployeeDto.email },
    });

    if (existingEmployee) {
      throw new ConflictException('Email already exists');
    }

    const employee = this.employeeRepository.create(createEmployeeDto);
    return await this.employeeRepository.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find({
      relations: ['department'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['department', 'user'],
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return employee;
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const employee = await this.findOne(id);

    // Check email uniqueness if email is being updated
    if (
      updateEmployeeDto.email &&
      updateEmployeeDto.email !== employee.email
    ) {
      const existingEmployee = await this.employeeRepository.findOne({
        where: { email: updateEmployeeDto.email },
      });

      if (existingEmployee) {
        throw new ConflictException('Email already exists');
      }
    }

    Object.assign(employee, updateEmployeeDto);
    return await this.employeeRepository.save(employee);
  }

  async remove(id: string): Promise<void> {
    const employee = await this.findOne(id);
    await this.employeeRepository.remove(employee);
  }

  async findByDepartment(departmentId: string): Promise<Employee[]> {
    return await this.employeeRepository.find({
      where: { departmentId },
      relations: ['department'],
    });
  }

  async getStatistics() {
    const total = await this.employeeRepository.count();
    const active = await this.employeeRepository.count({
      where: { status: EmploymentStatus.ACTIVE },
    });
    const onLeave = await this.employeeRepository.count({
      where: { status: EmploymentStatus.ON_LEAVE },
    });
    const terminated = await this.employeeRepository.count({
      where: { status: EmploymentStatus.TERMINATED },
    });

    // Gender statistics
    const maleCount = await this.employeeRepository.count({
      where: { gender: Gender.MALE },
    });
    const femaleCount = await this.employeeRepository.count({
      where: { gender: Gender.FEMALE },
    });

    return {
      total,
      active,
      onLeave,
      terminated,
      byGender: {
        male: maleCount,
        female: femaleCount,
        other: total - maleCount - femaleCount,
      },
    };
  }
}
