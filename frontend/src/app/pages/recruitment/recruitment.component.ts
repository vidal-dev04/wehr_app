import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Candidate {
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string;
  experience: string;
  avatar: string;
  score: number;
  appliedDate: string;
  status: string;
}

@Component({
  selector: 'app-recruitment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})
export class RecruitmentComponent implements OnInit {
  searchTerm: string = '';
  selectedFilter: string = 'all';
  
  kanbanColumns = [
    { id: 'nouveau', title: 'Nouveau', color: 'bg-blue-100', count: 0 },
    { id: 'revision', title: 'En Révision', color: 'bg-yellow-100', count: 0 },
    { id: 'entretien', title: 'Entretien', color: 'bg-purple-100', count: 0 },
    { id: 'offre', title: 'Offre', color: 'bg-green-100', count: 0 },
    { id: 'embauche', title: 'Embauché', color: 'bg-emerald-100', count: 0 }
  ];

  candidates: Candidate[] = [
    {
      id: 1,
      name: 'Marie Dubois',
      position: 'Développeur Full Stack',
      email: 'marie.dubois@email.com',
      phone: '+33 6 12 34 56 78',
      experience: '5 ans',
      avatar: 'https://ui-avatars.com/api/?name=Marie+Dubois&background=3b82f6&color=fff',
      score: 92,
      appliedDate: '2025-03-20',
      status: 'nouveau'
    },
    {
      id: 2,
      name: 'Thomas Martin',
      position: 'Designer UX/UI',
      email: 'thomas.martin@email.com',
      phone: '+33 6 23 45 67 89',
      experience: '3 ans',
      avatar: 'https://ui-avatars.com/api/?name=Thomas+Martin&background=8b5cf6&color=fff',
      score: 88,
      appliedDate: '2025-03-19',
      status: 'revision'
    },
    {
      id: 3,
      name: 'Sophie Bernard',
      position: 'Chef de Projet IT',
      email: 'sophie.bernard@email.com',
      phone: '+33 6 34 56 78 90',
      experience: '7 ans',
      avatar: 'https://ui-avatars.com/api/?name=Sophie+Bernard&background=ec4899&color=fff',
      score: 95,
      appliedDate: '2025-03-18',
      status: 'entretien'
    },
    {
      id: 4,
      name: 'Lucas Petit',
      position: 'Data Scientist',
      email: 'lucas.petit@email.com',
      phone: '+33 6 45 67 89 01',
      experience: '4 ans',
      avatar: 'https://ui-avatars.com/api/?name=Lucas+Petit&background=10b981&color=fff',
      score: 90,
      appliedDate: '2025-03-17',
      status: 'offre'
    },
    {
      id: 5,
      name: 'Emma Laurent',
      position: 'Développeur Frontend',
      email: 'emma.laurent@email.com',
      phone: '+33 6 56 78 90 12',
      experience: '3 ans',
      avatar: 'https://ui-avatars.com/api/?name=Emma+Laurent&background=f59e0b&color=fff',
      score: 85,
      appliedDate: '2025-03-22',
      status: 'nouveau'
    },
    {
      id: 6,
      name: 'Alexandre Roux',
      position: 'DevOps Engineer',
      email: 'alex.roux@email.com',
      phone: '+33 6 67 89 01 23',
      experience: '6 ans',
      avatar: 'https://ui-avatars.com/api/?name=Alexandre+Roux&background=ef4444&color=fff',
      score: 93,
      appliedDate: '2025-03-16',
      status: 'embauche'
    }
  ];

  draggedCandidate: Candidate | null = null;

  ngOnInit(): void {
    this.updateColumnCounts();
  }

  getCandidatesByStatus(status: string): Candidate[] {
    return this.candidates.filter(c => c.status === status);
  }

  updateColumnCounts(): void {
    this.kanbanColumns.forEach(column => {
      column.count = this.candidates.filter(c => c.status === column.id).length;
    });
  }

  onDragStart(candidate: Candidate): void {
    this.draggedCandidate = candidate;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent, newStatus: string): void {
    event.preventDefault();
    if (this.draggedCandidate) {
      this.draggedCandidate.status = newStatus;
      this.updateColumnCounts();
      this.draggedCandidate = null;
    }
  }

  getScoreColor(score: number): string {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 75) return 'text-blue-600 bg-blue-50';
    return 'text-orange-600 bg-orange-50';
  }
}
