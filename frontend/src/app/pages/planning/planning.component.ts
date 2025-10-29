import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Event {
  id: number;
  title: string;
  type: 'meeting' | 'training' | 'leave' | 'interview' | 'deadline';
  date: Date;
  startTime: string;
  endTime: string;
  location?: string;
  participants?: string[];
  description?: string;
  color: string;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: Event[];
}

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {
  currentDate: Date = new Date();
  viewMode: 'day' | 'week' | 'month' = 'week';
  selectedDate: Date = new Date();
  calendarDays: CalendarDay[] = [];
  
  eventTypes = [
    { id: 'meeting', label: 'Réunion', color: 'bg-blue-500', icon: 'users' },
    { id: 'training', label: 'Formation', color: 'bg-purple-500', icon: 'book' },
    { id: 'leave', label: 'Congé', color: 'bg-green-500', icon: 'calendar-x' },
    { id: 'interview', label: 'Entretien', color: 'bg-orange-500', icon: 'briefcase' },
    { id: 'deadline', label: 'Échéance', color: 'bg-red-500', icon: 'clock' }
  ];

  events: Event[] = [
    {
      id: 1,
      title: 'Réunion d\'équipe',
      type: 'meeting',
      date: new Date(2025, 2, 29, 10, 0),
      startTime: '10:00',
      endTime: '11:30',
      location: 'Salle A',
      participants: ['Marie', 'Thomas', 'Sophie'],
      description: 'Point hebdomadaire de l\'équipe',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Formation Angular',
      type: 'training',
      date: new Date(2025, 2, 29, 14, 0),
      startTime: '14:00',
      endTime: '17:00',
      location: 'En ligne',
      description: 'Session de formation sur Angular 17',
      color: 'bg-purple-500'
    },
    {
      id: 3,
      title: 'Entretien candidat',
      type: 'interview',
      date: new Date(2025, 2, 30, 11, 0),
      startTime: '11:00',
      endTime: '12:00',
      location: 'Bureau RH',
      participants: ['Emma Laurent'],
      description: 'Entretien pour poste Développeur Frontend',
      color: 'bg-orange-500'
    },
    {
      id: 4,
      title: 'Congé Lucas',
      type: 'leave',
      date: new Date(2025, 2, 31),
      startTime: '09:00',
      endTime: '18:00',
      description: 'Congé payé',
      color: 'bg-green-500'
    },
    {
      id: 5,
      title: 'Deadline Projet X',
      type: 'deadline',
      date: new Date(2025, 3, 2),
      startTime: '17:00',
      endTime: '17:00',
      description: 'Livraison finale du projet',
      color: 'bg-red-500'
    }
  ];

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    // Premier jour du mois
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Jours précédents à afficher
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    
    this.calendarDays = [];
    
    // Jours du mois précédent
    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      this.calendarDays.push({
        date,
        isCurrentMonth: false,
        isToday: this.isToday(date),
        events: this.getEventsForDate(date)
      });
    }
    
    // Jours du mois actuel
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      this.calendarDays.push({
        date,
        isCurrentMonth: true,
        isToday: this.isToday(date),
        events: this.getEventsForDate(date)
      });
    }
    
    // Jours du mois suivant
    const remainingDays = 42 - this.calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      this.calendarDays.push({
        date,
        isCurrentMonth: false,
        isToday: this.isToday(date),
        events: this.getEventsForDate(date)
      });
    }
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  getEventsForDate(date: Date): Event[] {
    return this.events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  }

  getTodayEvents(): Event[] {
    return this.getEventsForDate(new Date()).sort((a, b) => 
      a.startTime.localeCompare(b.startTime)
    );
  }

  previousMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  goToToday(): void {
    this.currentDate = new Date();
    this.generateCalendar();
  }

  getMonthName(): string {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
                    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    return months[this.currentDate.getMonth()];
  }

  getEventTypeIcon(type: string): string {
    const eventType = this.eventTypes.find(t => t.id === type);
    return eventType ? eventType.icon : 'calendar';
  }

  getEventTypeColor(type: string): string {
    const eventType = this.eventTypes.find(t => t.id === type);
    return eventType ? eventType.color : 'bg-gray-500';
  }
}
