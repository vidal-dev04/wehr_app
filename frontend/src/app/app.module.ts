import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

// Layouts
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';

// Pages
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { EmployeeFormComponent } from './pages/employees/employee-form/employee-form.component';
import { LoginComponent } from './pages/auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    EmployeesComponent,
    EmployeeFormComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
