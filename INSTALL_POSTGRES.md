# 📦 Installation de PostgreSQL sur Windows

## Étape 1 : Télécharger PostgreSQL

1. Allez sur : **https://www.postgresql.org/download/windows/**
2. Cliquez sur "Download the installer"
3. Choisissez la dernière version (PostgreSQL 16 ou 15)
4. Téléchargez la version **Windows x86-64**

## Étape 2 : Installer PostgreSQL

1. **Lancez l'installateur** téléchargé
2. Cliquez sur **Next**
3. **Répertoire d'installation** : Laissez par défaut → Next
4. **Composants à installer** : Cochez tout (PostgreSQL Server, pgAdmin 4, Stack Builder, Command Line Tools) → Next
5. **Répertoire des données** : Laissez par défaut → Next
6. **Mot de passe** : 
   - ⚠️ **IMPORTANT** : Choisissez un mot de passe simple pour le développement (ex: `postgres`)
   - ✍️ **Notez-le bien**, vous en aurez besoin !
7. **Port** : Laissez 5432 (par défaut) → Next
8. **Locale** : Laissez par défaut → Next
9. Cliquez sur **Next** puis **Finish**

## Étape 3 : Vérifier l'installation

Ouvrez PowerShell et testez :

```powershell
# Vérifier que psql est accessible
psql --version

# Si ça ne fonctionne pas, ajoutez PostgreSQL au PATH :
# Allez dans les variables d'environnement et ajoutez :
# C:\Program Files\PostgreSQL\16\bin
```

## Étape 4 : Créer la base de données

Dans PowerShell, exécutez :

```powershell
# Se connecter à PostgreSQL (utilisez le mot de passe que vous avez choisi)
psql -U postgres

# Dans psql, créer la base de données WeHR :
CREATE DATABASE wehr_db;

# Vérifier que la base est créée :
\l

# Quitter psql :
\q
```

## Étape 5 : Configurer le fichier .env

Ouvrez le fichier `.env` dans le dossier backend :

```
C:\Users\vidal\CascadeProjects\wehr-app\backend\.env
```

Modifiez avec vos informations :

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres    # ← Mettez VOTRE mot de passe ici !
DATABASE_NAME=wehr_db

# JWT Configuration
JWT_SECRET=votre_secret_jwt_super_securise_123456
JWT_EXPIRES_IN=24h

# Application Configuration
PORT=3000
CORS_ORIGIN=http://localhost:4200
```

## Étape 6 : Redémarrer le Backend

Une fois PostgreSQL installé et configuré :

1. **Arrêtez le backend** actuel (Ctrl+C dans le terminal)
2. **Relancez-le** :

```powershell
cd C:\Users\vidal\CascadeProjects\wehr-app\backend
npm run start:dev
```

Vous devriez voir :
```
[Nest] Application successfully started
TypeORM has created tables automatically
```

## ✅ Vérification Rapide

Pour vérifier que tout fonctionne, dans un nouveau terminal PowerShell :

```powershell
# Tester la connexion à la base
psql -U postgres -d wehr_db -c "SELECT version();"

# Voir les tables créées par TypeORM
psql -U postgres -d wehr_db -c "\dt"
```

Vous devriez voir les tables : `user`, `employee`, `department`, `job`, `schedule`, `announcement`

## 🐛 En cas de problème

### Le service PostgreSQL ne démarre pas

```powershell
# Démarrer manuellement le service
net start postgresql-x64-16
```

### "psql" n'est pas reconnu

Ajoutez PostgreSQL au PATH :
1. Recherchez "Variables d'environnement" dans Windows
2. Modifiez la variable "Path"
3. Ajoutez : `C:\Program Files\PostgreSQL\16\bin`

### Erreur de connexion

Vérifiez que :
- Le service PostgreSQL est démarré
- Le mot de passe dans `.env` est correct
- Le port 5432 n'est pas utilisé par une autre application

---

## 🚀 Après l'installation

Une fois PostgreSQL installé et le backend redémarré, passez à la création d'un utilisateur test !

```powershell
# Créer un utilisateur admin
curl.exe -X POST http://localhost:3000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"admin@wehr.com\",\"password\":\"password123\",\"role\":\"admin\"}'
```

Ensuite, ouvrez votre navigateur sur **http://localhost:4200** et connectez-vous avec :
- Email : `admin@wehr.com`
- Mot de passe : `password123`

🎉 **Bon développement !**
