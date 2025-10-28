import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  currentUser$: Observable<any>;
  showProfileDropdown = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser;
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  toggleProfileDropdown(): void {
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.showProfileDropdown = false;
  }
}
