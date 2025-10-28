import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  loading = false;
  isEditMode = false;
  employeeId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      position: ['', Validators.required],
      hireDate: ['', Validators.required],
      salary: [''],
      status: ['active'],
      address: [''],
      city: [''],
      country: [''],
      gender: [''],
      dateOfBirth: ['']
    });
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId) {
      this.isEditMode = true;
      this.loadEmployee(this.employeeId);
    }
  }

  loadEmployee(id: string): void {
    this.employeeService.getById(id).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue(employee);
      },
      error: (error) => {
        console.error('Error loading employee:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      return;
    }

    this.loading = true;
    const formData = this.employeeForm.value;

    const request = this.isEditMode && this.employeeId
      ? this.employeeService.update(this.employeeId, formData)
      : this.employeeService.create(formData);

    request.subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      },
      error: (error) => {
        console.error('Error saving employee:', error);
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}
