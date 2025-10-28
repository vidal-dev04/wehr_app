import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService, Employee } from '../../core/services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  loading = true;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAll().subscribe({
      next: (data) => {
        this.employees = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        this.loading = false;
      }
    });
  }

  createEmployee(): void {
    this.router.navigate(['/employees/new']);
  }

  editEmployee(id: string): void {
    this.router.navigate(['/employees/edit', id]);
  }

  deleteEmployee(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      this.employeeService.delete(id).subscribe({
        next: () => {
          this.loadEmployees();
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
        }
      });
    }
  }
}
