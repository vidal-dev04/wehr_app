import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserManagementService, User as MgmtUser, CreateUserRequest } from '../../core/services/user-management.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  activeTab: 'profile' | 'company' | 'notifications' | 'security' | 'integrations' | 'users' = 'profile';
  
  // User Management
  users: MgmtUser[] = [];
  loadingUsers = false;
  createUserForm: CreateUserRequest = {
    email: '',
    username: '',
    role: 'employee'
  };
  creatingUser = false;
  createUserMessage = '';
  createUserError = '';
  createdUserPassword = '';
  showPasswordCopied = false;
  
  // Profile Settings
  profileSettings = {
    name: 'Tecleky Vidal',
    email: 'vidaldev@gmail.com',
    phone: '0748280092',
    position: 'Administrateur',
    department: 'Direction',
    avatar: 'assets/images/Mask Group.png'
  };

  // Company Settings
  companySettings = {
    name: 'WeHR Solutions',
    industry: 'Technologie',
    size: '50-100',
    address: '123 Avenue des Champs-Élysées',
    city: 'Paris',
    postalCode: '75008',
    country: 'France',
    website: 'www.wehr.com',
    phone: '0748280092'
  };

  // Notification Settings
  notificationSettings = {
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    newEmployee: true,
    candidateApplication: true,
    upcomingMeeting: true,
    taskReminder: true,
    systemUpdates: false,
    weeklyReport: true
  };

  // Security Settings
  securitySettings = {
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordExpiry: '90',
    loginHistory: true
  };

  // Theme
  theme: 'light' | 'dark' | 'auto' = 'light';
  language: string = 'fr';

  constructor(
    private userManagementService: UserManagementService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loadingUsers = true;
    this.userManagementService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loadingUsers = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des utilisateurs:', error);
        this.loadingUsers = false;
      }
    });
  }

  getUserStatus(user: MgmtUser): string {
    if (!user.isActive) return 'Inactif';
    if (user.isTemporaryPassword) return 'En attente';
    return 'Actif';
  }

  getStatusClass(user: MgmtUser): string {
    if (!user.isActive) return 'bg-gray-100 text-gray-800';
    if (user.isTemporaryPassword) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  }

  createUser(): void {
    this.createUserMessage = '';
    this.createUserError = '';
    this.createdUserPassword = '';

    if (!this.createUserForm.email || !this.createUserForm.username) {
      this.createUserError = 'Veuillez remplir tous les champs';
      return;
    }

    this.creatingUser = true;
    this.userManagementService.createUserWithTempPassword(this.createUserForm).subscribe({
      next: (response) => {
        this.creatingUser = false;
        if (response.success) {
          this.createUserMessage = response.message;
          this.createdUserPassword = response.temporaryPassword || '';
          
          // Réinitialiser le formulaire
          this.createUserForm = {
            email: '',
            username: '',
            role: 'employee'
          };
          // Recharger la liste
          this.loadUsers();
          
          // Masquer le message après 30 secondes (pour laisser le temps de copier)
          setTimeout(() => {
            this.createUserMessage = '';
            this.createdUserPassword = '';
          }, 30000);
        } else {
          this.createUserError = response.message;
        }
      },
      error: (error) => {
        this.creatingUser = false;
        this.createUserError = error.error?.message || 'Une erreur est survenue';
      }
    });
  }

  copyPassword(): void {
    if (this.createdUserPassword) {
      navigator.clipboard.writeText(this.createdUserPassword).then(() => {
        this.showPasswordCopied = true;
        setTimeout(() => {
          this.showPasswordCopied = false;
        }, 2000);
      }).catch(err => {
        console.error('Erreur lors de la copie:', err);
      });
    }
  }

  getUserDisplayName(user: MgmtUser): string {
    // Si l'utilisateur a un username, l'utiliser
    if (user.username) {
      return user.username;
    }
    // Sinon, extraire la partie avant @ de l'email
    return user.email.split('@')[0];
  }

  deleteUser(userId: string, username: string): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur "${username}" ? Cette action est irréversible.`)) {
      this.userManagementService.deleteUser(userId).subscribe({
        next: (response) => {
          if (response.success) {
            // Afficher un message de succès temporaire
            this.createUserMessage = response.message;
            this.createdUserPassword = '';
            
            // Recharger la liste des utilisateurs
            this.loadUsers();
            
            // Masquer le message après 3 secondes
            setTimeout(() => {
              this.createUserMessage = '';
            }, 3000);
          } else {
            this.createUserError = response.message;
            setTimeout(() => {
              this.createUserError = '';
            }, 3000);
          }
        },
        error: (error) => {
          this.createUserError = error.error?.message || 'Une erreur est survenue lors de la suppression';
          setTimeout(() => {
            this.createUserError = '';
          }, 3000);
        }
      });
    }
  }

  saveProfile(): void {
    console.log('Profil sauvegardé:', this.profileSettings);
    // Appeler le service pour sauvegarder
    alert('Profil mis à jour avec succès !');
  }

  saveCompany(): void {
    console.log('Entreprise sauvegardée:', this.companySettings);
    alert('Informations de l\'entreprise mises à jour !');
  }

  saveNotifications(): void {
    console.log('Notifications sauvegardées:', this.notificationSettings);
    alert('Préférences de notifications mises à jour !');
  }

  saveSecurity(): void {
    console.log('Sécurité sauvegardée:', this.securitySettings);
    alert('Paramètres de sécurité mis à jour !');
  }

  changePassword(): void {
    alert('Fonctionnalité de changement de mot de passe à implémenter');
  }

  enable2FA(): void {
    this.securitySettings.twoFactorAuth = !this.securitySettings.twoFactorAuth;
    alert(this.securitySettings.twoFactorAuth ? 
      'Authentification à deux facteurs activée !' : 
      'Authentification à deux facteurs désactivée !');
  }

  uploadAvatar(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileSettings.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
