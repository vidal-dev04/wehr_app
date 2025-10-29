Wehr App

Une application web complète de gestion des ressources humaines avec NestJS (Backend) et Angular (Frontend).

Mon Projet se trouve sur git , le nom de la branche est "vidal".
Le nom de la repository est "wehr_app".

Voici les actions a effectuer pour avoir accès a l'application ( voir fichier .env.example):
Installez Postgres sur votre machine si ce n'est pas deja fait
Créez une base de données nommée "wehr_db"


## Étape 1 : Télécharger PostgreSQL

 Allez sur : **https://www.postgresql.org/download/windows/**
 Cliquez sur "Download the installer"
 Choisissez la dernière version (PostgreSQL 16 ou 15)
 Téléchargez la version **Windows x86-64**

## Étape 2 : Installer PostgreSQL

 Lancez l'installateur téléchargé
 Cliquez sur Next
 Répertoire d'installation : Laissez par défaut → Next
 Composants à installer : Cochez tout (PostgreSQL Server, pgAdmin 4, Stack Builder, Command Line Tools) → Next
 Répertoire des données : Laissez par défaut → Next
 Mot de passe : 
    *IMPORTANT* : Choisissez un mot de passe simple pour le développement (ex: postgres)
    *Notez-le bien*, vous en aurez besoin !
 Port : Laissez 5432 (par défaut) → Next
 Locale : Laissez par défaut → Next
 Cliquez sur Next puis Finish

## Étape 3 : Vérifier l'installation

Ouvrez PowerShell et testez :


# Vérifier que psql est accessible
psql --version

# Si ça ne fonctionne pas, ajoutez PostgreSQL au PATH :
# Allez dans les variables d'environnement et ajoutez :
# C:\Program Files\PostgreSQL\16\bin


## Étape 4 : Créer la base de données

Dans PowerShell, exécutez :

# Se connecter à PostgreSQL (utilisez le mot de passe que vous avez choisi)
psql -U postgres

# Dans psql, créer la base de données WeHR :
CREATE DATABASE wehr_db;

# Vérifier que la base est créée :
\l

# Quitter psql :
\q


## Étape 5 : Configurer le fichier .env

Ouvrez ou créez le fichier `.env` dans le dossier backend :

\wehr-app\backend\.env ( chemin absolu de votre dossier backend)

Modifiez avec vos informations :

# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres    # Mettez VOTRE mot de passe ici !
DATABASE_NAME=wehr_db

# JWT Configuration
JWT_SECRET=votre_secret_jwt_super_securise_123456
JWT_EXPIRES_IN=24h

# Application Configuration
PORT=3000
CORS_ORIGIN=http://localhost:4200


## Étape 6 : Redémarrer le Backend

Une fois PostgreSQL installé et configuré :

1. Arrêtez le backend actuel (Ctrl+C dans le terminal)
2. Relancez-le :


cd C:\Users\vidal\wehr_app\backend (selon le chemin absolu de votre dossier backend)
npm run start:dev


Vous devriez voir :

[Nest] Application successfully started
TypeORM has created tables automatically

## Vérification Rapide

Pour vérifier que tout fonctionne, dans un nouveau terminal PowerShell :

# Tester la connexion à la base
psql -U postgres -d wehr_db -c "SELECT version();"

# Voir les tables créées par TypeORM
psql -U postgres -d wehr_db -c "\dt"

Vous devriez voir les tables : `user`, `employee`, `department`, `job`, `schedule`, `announcement`



Une fois PostgreSQL installé et le backend redémarré, passez à la création d'un utilisateur test !

# Créer un utilisateur admin
curl.exe -X POST http://localhost:3000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"admin@wehr.com\",\"password\":\"password123\",\"role\":\"admin\"}'


Ensuite, ouvrez votre navigateur sur http://localhost:4200 et connectez-vous avec :
 Email : admin@wehr.com
 Mot de passe : password123



installez les dependances suivantes (dans le dossier backend et frontend) :

backend : npm install
frontend : npm install

Pour Lancer l'application il faut lancer le backend et le frontend (dans des terminaux differents) :

backend : npm run start:dev (dans le dossier backend)
frontend : npm start (dans le dossier frontend)

La structure du projet est la suivante :

wehr-app/
backend/ et ses dossiers src/ et node_modules/
frontend/ et ses dossiers src/ et node_modules/
.gitignore
README.md

Technologies utilisées :
 Backend : NestJS
 Frontend : Angular
 Base de données : PostgreSQL
 Authentification : JWT

l'utilisateur peut effectuer les actions suivantes :
 Se connecter
 Se déconnecter


les menus fonctionnels sont les suivants :
dashboard
recrutement
planning
employés ( dans ce menu on peut ajouter, modifier, supprimer et consulter les employés)
paramètres

Alors Pourquoi j'ai choisir NestJS comme Backend et Angular comme Frontend ?

Car NestJS est un framework moderne et performant pour les applications backend, il est facile d'apprendre et d'utiliser et c'est le meilleur framework pour les applications backend Node.js et quant à Angular, tout simplement parce que c'est la technologie la plus utilisée pour les applications frontend 

 NestJS + Angular est le choix idéal pour une application RH professionnelle, scalable et maintenable. C'est la stack TypeScript complète pour les applications d'entreprise modernes. 

