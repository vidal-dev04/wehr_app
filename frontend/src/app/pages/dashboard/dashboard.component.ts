import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardStats: any = null;
  loading = true;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    this.dashboardService.getDashboardStats().subscribe({
      next: (data) => {
        this.dashboardStats = data;
        // Ajouter isPinned à chaque annonce si non présent
        if (this.dashboardStats.announcements) {
          this.dashboardStats.announcements = this.dashboardStats.announcements.map((ann: any) => ({
            ...ann,
            isPinned: ann.isPinned || false
          }));
          this.sortAnnouncements();
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard stats:', error);
        this.loading = false;
      }
    });
  }

  togglePin(announcement: any): void {
    announcement.isPinned = !announcement.isPinned;
    this.sortAnnouncements();
  }

  sortAnnouncements(): void {
    if (this.dashboardStats.announcements) {
      this.dashboardStats.announcements.sort((a: any, b: any) => {
        // Les annonces épinglées en premier
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return 0;
      });
    }
  }

  getCurrentDateTime(): string {
    const now = new Date();
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    
    return `${hours}:${minutes}, ${day} ${date} ${month} ${year}`;
  }
}
