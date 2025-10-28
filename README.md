# WeHR - Application de Gestion RH

Une application web complète de gestion des ressources humaines avec NestJS et Angular.

## 🚀 Fonctionnalités

- **Dashboard** : Vue d'ensemble des statistiques RH
- **Gestion des employés** : CRUD complet
- **Gestion des départements** : Organisation des équipes
- **Recrutement** : Suivi des positions ouvertes et candidatures
- **Planning** : Gestion des horaires et événements
- **Annonces** : Communication interne
- **Authentification sécurisée** : JWT avec protection des données
- **Interface responsive** : Desktop, Tablette, Mobile

## 📁 Structure du Projet

```
wehr-app/
├── backend/          # API NestJS
│   ├── src/
│   │   ├── auth/     # Authentification JWT
│   │   ├── employees/
│   │   ├── departments/
│   │   ├── jobs/
│   │   ├── schedules/
│   │   └── announcements/
│   └── ...
└── frontend/         # Application Angular
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   ├── services/
    │   │   └── guards/
    │   └── ...
    └── ...
```

## 🛠️ Technologies

### Backend
- **NestJS** : Framework Node.js
- **TypeORM** : ORM pour la base de données
- **PostgreSQL** : Base de données
- **JWT** : Authentification
- **class-validator** : Validation des données
- **bcrypt** : Hashage des mots de passe

### Frontend
- **Angular 17+** : Framework frontend
- **RxJS** : Gestion d'état réactive
- **Angular Material** : Composants UI
- **TailwindCSS** : Styling
- **Chart.js** : Graphiques

## 🚀 Installation

### Prérequis
- Node.js >= 18
- PostgreSQL >= 14
- npm ou yarn

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Configurer les variables d'environnement
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## 📝 Variables d'Environnement

Créer un fichier `.env` dans le dossier backend :

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=wehr_db
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h
PORT=3000
```

## 🔒 Sécurité

- Authentification JWT
- Validation des entrées avec class-validator
- Protection contre les injections SQL via TypeORM
- Hashage des mots de passe avec bcrypt
- Guards pour la protection des routes
- CORS configuré

## 📱 Responsive Design

L'application est entièrement responsive et optimisée pour :
- Desktop (1920px+)
- Tablette (768px - 1024px)
- Mobile (320px - 767px)

## 👥 Auteurs

Projet développé avec NestJS et Angular

## 📄 Licence

MIT
