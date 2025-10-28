import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  sidebarOpen = true;

  ngOnInit(): void {
    // Fermer la sidebar sur mobile par défaut
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    // Fermer la sidebar si la largeur est < 1024px (breakpoint lg de Tailwind)
    if (window.innerWidth < 1024) {
      this.sidebarOpen = false;
    } else {
      this.sidebarOpen = true;
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
