import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isOpen = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard', active: true },
    { label: 'Recrutement', icon: 'users', route: '/recruitment', active: false },
    { label: 'Planning', icon: 'calendar', route: '/schedule', active: false },
    { label: 'Employés', icon: 'user', route: '/employees', active: false },
    { label: 'Départements', icon: 'building', route: '/departments', active: false },
  ];

  otherItems = [
    { label: 'Support', icon: 'headset', route: '/support', active: false },
    { label: 'Paramètres', icon: 'settings', route: '/settings', active: false },
  ];

  constructor(private router: Router) {}

  navigate(route: string): void {
    this.router.navigate([route]);
  }
}
