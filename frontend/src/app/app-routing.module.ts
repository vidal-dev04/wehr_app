import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { EmployeeFormComponent } from './pages/employees/employee-form/employee-form.component';
import { RecruitmentComponent } from './pages/recruitment/recruitment.component';
import { PlanningComponent } from './pages/planning/planning.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'recruitment',
        component: RecruitmentComponent
      },
      {
        path: 'schedule',
        component: PlanningComponent
      },
      {
        path: 'employees',
        component: EmployeesComponent
      },
      {
        path: 'employees/new',
        component: EmployeeFormComponent
      },
      {
        path: 'employees/edit/:id',
        component: EmployeeFormComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
