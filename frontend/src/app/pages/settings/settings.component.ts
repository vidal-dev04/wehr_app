import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  activeTab: 'profile' | 'company' | 'notifications' | 'security' | 'integrations' = 'profile';
  
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

  ngOnInit(): void {}

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
