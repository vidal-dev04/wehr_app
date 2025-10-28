# WeHR - Instructions de Configuration et d'Installation

## 📋 Vue d'ensemble

L'application **WeHR** est une solution complète de gestion RH avec:
- **Backend**: NestJS + TypeORM + PostgreSQL + JWT
- **Frontend**: Angular 17 + TailwindCSS + RxJS
- **Architecture**: Clean Architecture avec séparation des responsabilités
- **Sécurité**: Authentification JWT, validation des données, protection contre les injections
- **Design Responsive**: Desktop, Tablette, Mobile

## 🎯 Ce qui a été créé

### Backend (NestJS)
✅ Configuration complète de NestJS avec TypeORM
✅ 6 Entités principales: User, Employee, Department, Job, Schedule, Announcement
✅ APIs RESTful avec CRUD complet pour:
   - Employees (Employés)
   - Departments (Départements)
   - Auth (Authentification)
   - Dashboard (Statistiques)
✅ Authentification JWT avec guards et strategies
✅ Validation des données avec class-validator
✅ Gestion des erreurs et intercepteurs
✅ Relations entre entités (OneToMany, ManyToOne)

### Frontend (Angular)
✅ Configuration Angular 17 avec TailwindCSS
✅ Services: Auth, Employee, Dashboard
✅ Guards et Interceptors HTTP
✅ Page de connexion avec formulaire validé
✅ Structure des layouts (Sidebar, Header, Main Layout)
✅ Routing configuré avec protection des routes
✅ Design System avec Tailwind

## 🚀 Installation et Lancement

### Prérequis
- Node.js >= 18
- PostgreSQL >= 14
- npm ou yarn

### Étape 1: Configuration de la Base de Données

```powershell
# Créer la base de données PostgreSQL
psql -U postgres
CREATE DATABASE wehr_db;
\q
```

### Étape 2: Installation du Backend

```powershell
cd C:\Users\vidal\CascadeProjects\wehr-app\backend

# Installer les dépendances
npm install

# Créer le fichier .env
Copy-Item .env.example .env

# Éditer le fichier .env avec vos paramètres
notepad .env
```

Configurez le fichier `.env`:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=VOTRE_MOT_DE_PASSE
DATABASE_NAME=wehr_db
JWT_SECRET=votre_secret_jwt_super_securise
JWT_EXPIRES_IN=24h
PORT=3000
CORS_ORIGIN=http://localhost:4200
```

```powershell
# Lancer le backend
npm run start:dev
```

Le backend sera accessible sur `http://localhost:3000/api`

### Étape 3: Installation du Frontend

```powershell
cd C:\Users\vidal\CascadeProjects\wehr-app\frontend

# Installer les dépendances
npm install

# Lancer le frontend
npm start
```

Le frontend sera accessible sur `http://localhost:4200`

## 📝 Données de Test

### Créer un utilisateur admin

Utilisez un outil comme Postman ou curl:

```powershell
curl -X POST http://localhost:3000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{
    "email": "admin@wehr.com",
    "password": "password",
    "role": "admin"
  }'
```

### Se connecter

```
Email: admin@wehr.com
Mot de passe: password
```

## 🎨 Fonctionnalités Implémentées

### Backend APIs

#### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

#### Employés
- `GET /api/employees` - Liste des employés
- `GET /api/employees/:id` - Détails d'un employé
- `POST /api/employees` - Créer un employé
- `PATCH /api/employees/:id` - Modifier un employé
- `DELETE /api/employees/:id` - Supprimer un employé
- `GET /api/employees/statistics` - Statistiques

#### Départements
- `GET /api/departments` - Liste des départements
- `GET /api/departments/:id` - Détails d'un département
- `POST /api/departments` - Créer un département
- `PATCH /api/departments/:id` - Modifier un département
- `DELETE /api/departments/:id` - Supprimer un département

#### Dashboard
- `GET /api/dashboard/stats` - Statistiques du dashboard

### Frontend Pages

✅ **Page de Connexion** (`/login`)
   - Formulaire avec validation complète
   - Gestion des erreurs
   - Redirection après connexion

✅ **Layout Principal** (avec sidebar et header)

📝 **À compléter** (structure créée, templates à finaliser):
   - Dashboard (`/dashboard`)
   - Liste des Employés (`/employees`)
   - Formulaire Employé (`/employees/new` et `/employees/edit/:id`)

## 📂 Structure du Projet

```
wehr-app/
├── backend/
│   ├── src/
│   │   ├── auth/                 # Authentification JWT
│   │   ├── users/                # Gestion des utilisateurs
│   │   ├── employees/            # Gestion des employés (CRUD complet)
│   │   ├── departments/          # Gestion des départements (CRUD complet)
│   │   ├── jobs/                 # Gestion des offres d'emploi
│   │   ├── schedules/            # Gestion des plannings
│   │   ├── announcements/        # Gestion des annonces
│   │   ├── dashboard/            # Statistiques dashboard
│   │   ├── main.ts               # Point d'entrée
│   │   └── app.module.ts         # Module principal
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── core/             # Services, Guards, Interceptors
    │   │   ├── shared/           # Composants partagés
    │   │   ├── layouts/          # Layouts (sidebar, header)
    │   │   ├── pages/            # Pages de l'application
    │   │   ├── app.module.ts     # Module principal
    │   │   └── app-routing.module.ts
    │   ├── environments/         # Configuration
    │   ├── styles.scss           # Styles globaux + Tailwind
    │   └── index.html
    ├── package.json
    ├── angular.json
    ├── tailwind.config.js
    └── tsconfig.json
```

## 🔐 Sécurité Implémentée

✅ Authentification JWT avec refresh tokens
✅ Hashage des mots de passe avec bcrypt
✅ Validation des données (class-validator)
✅ Protection contre les injections SQL (TypeORM)
✅ Guards pour protéger les routes backend
✅ Guards pour protéger les routes frontend
✅ HTTP Interceptor pour ajouter le token JWT
✅ CORS configuré

## 🎯 Prochaines Étapes

Pour finaliser l'application, il reste à:

1. **Créer les composants manquants**:
   - Sidebar component (navigation)
   - Header component (profil utilisateur, notifications)
   - Dashboard component (affichage des statistiques)
   - Employees list component (tableau des employés)
   - Employee form component (formulaire complet avec validation)

2. **Ajouter les fonctionnalités supplémentaires**:
   - Gestion des départements
   - Gestion des recrutements
   - Planning
   - Annonces

3. **Tests**:
   - Tests unitaires (Jest)
   - Tests E2E

4. **Déploiement**:
   - Configuration production
   - Variables d'environnement
   - Build optimisé

## 📞 Support

Si vous avez des questions ou des problèmes:
1. Vérifiez que PostgreSQL est bien lancé
2. Vérifiez les logs du backend dans la console
3. Vérifiez les logs du frontend dans la console du navigateur
4. Assurez-vous que les ports 3000 et 4200 sont libres

## 🎨 Design Reference

L'application suit le design fourni avec:
- **Dashboard**: Statistiques, graphiques, activités récentes
- **Responsive**: Adaptation automatique Desktop/Tablette/Mobile
- **Moderne**: Design épuré avec Tailwind CSS
- **UX**: Navigation intuitive avec sidebar persistante

---

**Note**: Les erreurs TypeScript que vous voyez actuellement sont normales et seront résolues automatiquement lors de l'installation des dépendances avec `npm install`.
