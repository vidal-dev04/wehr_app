import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() isOpen = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard', active: false },
    { label: 'Recrutement', icon: 'users', route: '/recruitment', active: false },
    { label: 'Planning', icon: 'calendar', route: '/schedule', active: false },
    { label: 'Employés', icon: 'user', route: '/employees', active: false },
    { label: 'Départements', icon: 'building', route: '/departments', active: false },
  ];

  otherItems: MenuItem[] = [
    { label: 'Support', icon: 'headset', route: '/support', active: false },
    { label: 'Paramètres', icon: 'settings', route: '/settings', active: false },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Écouter les changements de route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveStates();
    });
    
    // Mettre à jour l'état initial
    this.updateActiveStates();
  }

  updateActiveStates(): void {
    const currentRoute = this.router.url;
    
    this.menuItems.forEach(item => {
      item.active = currentRoute.startsWith(item.route);
    });
    
    this.otherItems.forEach(item => {
      item.active = currentRoute.startsWith(item.route);
    });
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }
}
