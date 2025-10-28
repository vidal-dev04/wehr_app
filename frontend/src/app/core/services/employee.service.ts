import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  position: string;
  hireDate: string;
  salary?: number;
  status: 'active' | 'inactive' | 'on_leave' | 'terminated';
  address?: string;
  city?: string;
  country?: string;
  avatar?: string;
  departmentId?: string;
  department?: any;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEmployeeDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  position: string;
  hireDate: string;
  salary?: number;
  status?: 'active' | 'inactive' | 'on_leave' | 'terminated';
  address?: string;
  city?: string;
  country?: string;
  avatar?: string;
  departmentId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = `${environment.apiUrl}/employees`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  create(employee: CreateEmployeeDto): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  update(id: string, employee: Partial<CreateEmployeeDto>): Observable<Employee> {
    return this.http.patch<Employee>(`${this.apiUrl}/${id}`, employee);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/statistics`);
  }
}
