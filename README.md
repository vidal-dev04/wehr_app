# 🏢 WeHR - Application de Gestion RH

Une application web complète de gestion des ressources humaines développée avec **NestJS** (Backend) et **Angular** (Frontend).

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat&logo=angular&logoColor=white)](https://angular.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)

---

## 📖 Table des Matières

- [Démarrage Rapide](#-démarrage-rapide)
  - [Option 1 : Avec Docker (Recommandé)](#option-1--avec-docker-recommandé)
  - [Option 2 : Installation Classique](#option-2--installation-classique-sans-docker)
- [Structure du Projet](#-structure-du-projet)
- [Technologies Utilisées](#️-technologies-utilisées)
- [Fonctionnalités](#-fonctionnalités)
- [Pourquoi NestJS + Angular ?](#-pourquoi-nestjs--angular-)
- [Documentation Supplémentaire](#-documentation-supplémentaire)
- [Auteur](#-auteur)

---


## 🚀 Démarrage Rapide

### **Option 1 : Avec Docker (Recommandé)**

La façon la plus simple de lancer l'application est d'utiliser Docker. Tout est configuré et prêt à fonctionner !

#### **Prérequis**
- Docker Desktop installé ([Télécharger ici](https://www.docker.com/products/docker-desktop/))
- Les fichiers `.env` configurés (voir section Configuration ci-dessous)

#### **Configuration**
1. Copiez le fichier d'exemple :
```bash
copy .env.docker .env
```

2. Éditez le fichier `.env` et ajoutez votre connection string Neon :
```env
DATABASE_URL=postgresql://votre_connection_string_neon_ici
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=24h
```

#### **Lancement**
```bash
# Build les images Docker
docker-compose build

# Lancer l'application
docker-compose up -d

# Vérifier que tout tourne
docker-compose ps
```

#### **Accès à l'application**
- **Frontend** : http://localhost
- **Backend API** : http://localhost:3000/api

#### **Identifiants par défaut**
- **Username** : `admin`
- **Password** : `password`

#### **Commandes utiles**
```bash
# Voir les logs en temps réel
docker-compose logs -f

# Arrêter l'application
docker-compose down

# Redémarrer
docker-compose restart
```

📖 **Pour plus de détails, consultez [DOCKER-SETUP.md](DOCKER-SETUP.md)**

---

### **Option 2 : Installation Classique (Sans Docker)**

#### **1. Installer les dépendances**

Dans le dossier backend :
```bash
cd backend
npm install
```

Dans le dossier frontend :
```bash
cd frontend
npm install
```

#### **2. Configuration**

Créez un fichier `.env` dans le dossier `backend/` :
```env
DATABASE_URL=postgresql://votre_connection_string_neon_ici
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=24h
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:4200
```

#### **3. Lancement**

Dans deux terminaux différents :

**Terminal 1 - Backend :**
```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend :**
```bash
cd frontend
npm start
```

#### **Accès à l'application**
- **Frontend** : http://localhost:4200
- **Backend API** : http://localhost:3000/api

---

## 📁 Structure du Projet

```
wehr-app/
├── backend/                    # Backend NestJS
│   ├── src/
│   │   ├── auth/              # Module d'authentification
│   │   ├── users/             # Module utilisateurs
│   │   ├── employees/         # Module employés
│   │   ├── departments/       # Module départements
│   │   ├── jobs/              # Module postes
│   │   ├── schedules/         # Module planning
│   │   └── announcements/     # Module annonces
│   ├── Dockerfile             # Configuration Docker backend
│   └── package.json
│
├── frontend/                   # Frontend Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/          # Services, guards, interceptors
│   │   │   ├── pages/         # Composants pages
│   │   │   └── shared/        # Composants partagés
│   ├── Dockerfile             # Configuration Docker frontend
│   ├── nginx.conf             # Configuration Nginx
│   └── package.json
│
├── docker-compose.yml         # Orchestration Docker
├── .env.docker                # Template variables d'environnement
├── DOCKER-SETUP.md            # Guide Docker complet
└── README.md                  # Ce fichier
```

---

## 🛠️ Technologies Utilisées

- **Backend** : NestJS (TypeScript)
- **Frontend** : Angular (standalone components)
- **Base de données** : PostgreSQL (Neon cloud)
- **Authentification** : JWT + bcrypt
- **Conteneurisation** : Docker + Docker Compose
- **Web Server** : Nginx (pour le frontend en production)

---

## ✨ Fonctionnalités

### **Authentification**
- ✅ Connexion avec email ou pseudo
- ✅ Mot de passe temporaire pour nouveaux utilisateurs
- ✅ Changement de mot de passe
- ✅ Déconnexion

### **Menus Fonctionnels**

- **Dashboard** : Vue d'ensemble de l'application
- **Recrutement** : Gestion des processus de recrutement
- **Planning** : Gestion des horaires et plannings
- **Employés** : CRUD complet (ajout, modification, suppression, consultation)
- **Paramètres** : 
  - Gestion des utilisateurs
  - Création d'utilisateurs avec mot de passe temporaire
  - Interface de changement de mot de passe

---

## 💡 Pourquoi NestJS + Angular ?

### **NestJS pour le Backend**
- ✅ Framework moderne et performant
- ✅ Architecture modulaire et scalable
- ✅ TypeScript natif
- ✅ Parfait pour les applications Node.js d'entreprise
- ✅ Excellent support de TypeORM et PostgreSQL
- ✅ Facile à apprendre et à maintenir

### **Angular pour le Frontend**
- ✅ Framework le plus utilisé pour les applications professionnelles
- ✅ Standalone components pour une architecture moderne
- ✅ TypeScript natif pour une cohérence avec le backend
- ✅ Excellent pour les applications RH complexes
- ✅ Grande communauté et support à long terme

**Conclusion** : NestJS + Angular = Stack TypeScript complète, idéale pour les applications RH professionnelles, scalables et maintenables. 🚀

---

## 📚 Documentation Supplémentaire

- **[DOCKER-SETUP.md](DOCKER-SETUP.md)** : Guide complet pour Docker
- **[analyze-dependencies.ps1](analyze-dependencies.ps1)** : Script d'analyse des dépendances

---

## 👤 Auteur

- **Branche** : `vidal`
- **Repository** : `wehr_app`

---

## 🎉 Félicitations !

Votre application WeHR est maintenant prête à être utilisée ! 

**Besoin d'aide ?** Consultez les fichiers de documentation ou les logs Docker.

