import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: string;
  email: string;
  username?: string;
  role: string;
  isActive: boolean;
  isTemporaryPassword?: boolean;
  createdAt: Date;
}

export interface CreateUserRequest {
  email: string;
  username: string;
  role: string;
}

export interface CreateUserResponse {
  success: boolean;
  message: string;
  temporaryPassword?: string;
  user?: {
    id: string;
    email: string;
    username: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  createUserWithTempPassword(request: CreateUserRequest): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(
      `${environment.apiUrl}/users/create-with-temp-password`,
      request
    );
  }

  deleteUser(userId: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${environment.apiUrl}/users/${userId}`
    );
  }
}
