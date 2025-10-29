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
      name: 'Tecleky Vidal',
      position: 'Dev Full Stack',
      email: 'vidaldev@gmail.com',
      phone: '0748280092',
      experience: '3 ans',
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
