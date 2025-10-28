import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const existing = await this.departmentRepository.findOne({
      where: { name: createDepartmentDto.name },
    });

    if (existing) {
      throw new ConflictException('Department name already exists');
    }

    const department = this.departmentRepository.create(createDepartmentDto);
    return await this.departmentRepository.save(department);
  }

  async findAll(): Promise<Department[]> {
    return await this.departmentRepository.find({
      relations: ['employees'],
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['employees'],
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    return department;
  }

  async update(
    id: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    const department = await this.findOne(id);
    Object.assign(department, updateDepartmentDto);
    return await this.departmentRepository.save(department);
  }

  async remove(id: string): Promise<void> {
    const department = await this.findOne(id);
    await this.departmentRepository.remove(department);
  }
}
