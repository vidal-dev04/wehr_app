# 🐳 Guide Docker pour WeHR

Ce guide explique comment installer Docker et déployer l'application WeHR avec Docker.

---

## 📦 **Prérequis**

- Docker Desktop installé (Windows)
- Git (pour cloner le projet)
- Les fichiers `.env` configurés

---

## 🔧 **1. Installation de Docker Desktop**

### **Télécharger Docker Desktop**

1. Allez sur : **https://www.docker.com/products/docker-desktop/**
2. Cliquez sur **Download for Windows**
3. Téléchargez l'installateur

### **Installer Docker Desktop**

1. Lancez l'installateur téléchargé
2. Suivez l'assistant d'installation
3. **Cochez** "Use WSL 2 instead of Hyper-V" (recommandé)
4. Cliquez sur **Install**
5. **Redémarrez** votre ordinateur si demandé

### **Vérifier l'installation**

Ouvrez PowerShell et testez :

```powershell
docker --version
docker-compose --version
```

Vous devriez voir les versions installées.

---

## 🚀 **2. Configuration du projet**

### **Étape 1 : Préparer le fichier .env**

Copiez le fichier `.env.docker` vers `.env` à la racine du projet :

```powershell
cd c:\Users\vidal\Documents\wehr-app
copy .env.docker .env
```

### **Étape 2 : Éditer le fichier .env**

Ouvrez le fichier `.env` et remplissez avec vos vraies valeurs :

```env
# Neon Database - METTEZ VOTRE VRAIE CONNECTION STRING
DATABASE_URL=postgresql://neondb_owner:xxx@ep-xxx.region.aws.neon.tech/neondb?sslmode=require

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=24h
```

---

## 🏗️ **3. Build et lancement avec Docker Compose**

### **Build les images Docker**

```powershell
cd c:\Users\vidal\Documents\wehr-app
docker-compose build
```

Cette commande va :
- ✅ Créer l'image Docker du backend (NestJS)
- ✅ Créer l'image Docker du frontend (Angular + Nginx)

### **Lancer l'application**

```powershell
docker-compose up -d
```

L'option `-d` lance les conteneurs en arrière-plan (detached mode).

### **Vérifier que les conteneurs tournent**

```powershell
docker-compose ps
```

Vous devriez voir :
```
NAME                COMMAND             STATUS          PORTS
wehr-backend        "node dist/main"    Up 10 seconds   0.0.0.0:3000->3000/tcp
wehr-frontend       "nginx -g..."       Up 10 seconds   0.0.0.0:80->80/tcp
```

---

## 🧪 **4. Tester l'application**

### **Accéder à l'application**

- **Frontend** : http://localhost
- **Backend API** : http://localhost:3000/api

### **Se connecter**

- **Username** : `admin`
- **Password** : `password`

---

## 📊 **5. Commandes Docker utiles**

### **Voir les logs**

```powershell
# Logs de tous les conteneurs
docker-compose logs -f

# Logs du backend seulement
docker-compose logs -f backend

# Logs du frontend seulement
docker-compose logs -f frontend
```

### **Arrêter l'application**

```powershell
docker-compose down
```

### **Redémarrer l'application**

```powershell
docker-compose restart
```

### **Reconstruire après modification du code**

```powershell
docker-compose down
docker-compose build
docker-compose up -d
```

### **Supprimer tout (conteneurs + images + volumes)**

```powershell
docker-compose down -v --rmi all
```

---

## 🔍 **6. Analyse des dépendances**

### **Backend (NestJS)**

**Dépendances principales :**
- `@nestjs/core` - Framework NestJS
- `@nestjs/typeorm` - ORM pour PostgreSQL
- `typeorm` - ORM
- `pg` - Driver PostgreSQL
- `@nestjs/jwt` - Authentification JWT
- `@nestjs/passport` - Stratégies d'authentification
- `bcrypt` - Hashing des mots de passe
- `class-validator` - Validation des données
- `class-transformer` - Transformation des objets

**Taille de l'image Docker :**
- Build stage : ~1.2 GB
- Production stage : ~200 MB (optimisé avec multi-stage build)

### **Frontend (Angular)**

**Dépendances principales :**
- `@angular/core` - Framework Angular
- `@angular/router` - Routing
- `@angular/forms` - Gestion des formulaires
- `rxjs` - Programmation réactive
- `tailwindcss` - Styling CSS

**Taille de l'image Docker :**
- Build stage : ~1.5 GB
- Production stage : ~30 MB (Nginx + fichiers statiques)

---

## 🐛 **7. Dépannage**

### **Le backend ne démarre pas**

```powershell
# Vérifier les logs
docker-compose logs backend

# Vérifier que la DATABASE_URL est correcte dans .env
```

### **Le frontend ne se connecte pas au backend**

Vérifiez que `CORS_ORIGIN` dans le backend pointe vers `http://localhost:80`

### **Port déjà utilisé**

Si le port 80 ou 3000 est déjà utilisé :

1. Arrêtez l'application qui utilise ce port
2. OU modifiez les ports dans `docker-compose.yml` :

```yaml
ports:
  - "8080:80"  # Frontend sur port 8080 au lieu de 80
```

---

## 📦 **8. Déploiement en production**

Pour déployer en production :

1. **Modifiez `docker-compose.yml`** :
   - Changez `NODE_ENV` en `production`
   - Mettez à jour `CORS_ORIGIN` avec votre domaine

2. **Utilisez un reverse proxy** (Nginx, Traefik)

3. **Activez HTTPS** avec Let's Encrypt

4. **Utilisez Docker Swarm ou Kubernetes** pour l'orchestration

---

## ✅ **Résumé**

Avec Docker, vous avez :
- ✅ Backend NestJS containerisé
- ✅ Frontend Angular avec Nginx
- ✅ Configuration via variables d'environnement
- ✅ Images optimisées avec multi-stage builds
- ✅ Orchestration avec docker-compose
- ✅ Healthchecks pour monitoring

**Commande rapide pour tout lancer :**

```powershell
cd c:\Users\vidal\Documents\wehr-app
docker-compose up -d
```

**Arrêter :**

```powershell
docker-compose down
```

🎉 **Votre application WeHR est maintenant Dockerisée !**
