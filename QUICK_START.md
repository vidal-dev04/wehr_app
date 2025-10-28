# 🚀 Guide de Démarrage Rapide - WeHR

## ✅ Prérequis Installés
- [x] Dépendances backend installées
- [x] Dépendances frontend installées
- [x] Fichier .env créé

## 🔧 Configuration Actuelle

### Serveurs
- **Backend API**: http://localhost:3000/api
- **Frontend**: http://localhost:4200

### Base de Données
- **Nom**: wehr_db
- **Host**: localhost
- **Port**: 5432

## 📝 Prochaines Étapes

### 1. Vérifier que les serveurs sont démarrés

Une fois la compilation terminée, vous devriez voir :

**Backend** (Terminal 1):
```
[Nest] Application successfully started
Application is running on: http://localhost:3000
```

**Frontend** (Terminal 2):
```
✔ Compiled successfully
** Angular Live Development Server is listening on localhost:4200
```

### 2. Créer un Utilisateur Test

Ouvrez un nouveau terminal PowerShell et exécutez :

```powershell
# Créer un utilisateur admin
curl -X POST http://localhost:3000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{\"email\": \"admin@wehr.com\", \"password\": \"password123\", \"role\": \"admin\"}'
```

### 3. Se Connecter à l'Application

1. Ouvrez votre navigateur : **http://localhost:4200**
2. Vous verrez la page de connexion
3. Utilisez les identifiants :
   - **Email**: admin@wehr.com
   - **Mot de passe**: password123

### 4. Explorer l'Application

Une fois connecté, vous aurez accès à :

- **📊 Dashboard**: Vue d'ensemble avec statistiques
- **👥 Employés**: Liste et gestion des employés
- **➕ Ajouter Employé**: Formulaire complet avec validation
- **🏢 Départements**: Gestion des départements (API prête)

## 🔍 Vérifications

### Backend Santé
```powershell
curl http://localhost:3000/api
```

### Tester l'authentification
```powershell
# Login
curl -X POST http://localhost:3000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\": \"admin@wehr.com\", \"password\": \"password123\"}'
```

## 🐛 Résolution de Problèmes

### Le Backend ne démarre pas

1. Vérifiez PostgreSQL :
   ```powershell
   psql -U postgres -c "SELECT version();"
   ```

2. Vérifiez que la base `wehr_db` existe :
   ```powershell
   psql -U postgres -c "\l"
   ```

3. Vérifiez le fichier `.env` :
   - Le mot de passe PostgreSQL est correct
   - Le nom de la base est `wehr_db`

### Le Frontend ne démarre pas

1. Vérifiez les ports :
   ```powershell
   netstat -ano | findstr :4200
   ```

2. Si le port est occupé, arrêtez le processus ou changez le port dans `angular.json`

### Erreur de connexion à la base de données

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution**: PostgreSQL n'est pas démarré
```powershell
# Démarrer le service PostgreSQL
net start postgresql-x64-14  # Ajustez selon votre version
```

## 📚 APIs Disponibles

### Authentification
- `POST /api/auth/register` - Créer un compte
- `POST /api/auth/login` - Se connecter

### Employés
- `GET /api/employees` - Liste des employés
- `POST /api/employees` - Créer un employé
- `GET /api/employees/:id` - Détails d'un employé
- `PATCH /api/employees/:id` - Modifier un employé
- `DELETE /api/employees/:id` - Supprimer un employé

### Départements
- `GET /api/departments` - Liste des départements
- `POST /api/departments` - Créer un département
- `GET /api/departments/:id` - Détails d'un département
- `PATCH /api/departments/:id` - Modifier un département
- `DELETE /api/departments/:id` - Supprimer un département

### Dashboard
- `GET /api/dashboard/stats` - Statistiques du dashboard

## 🎉 Succès !

Si vous voyez la page de connexion à http://localhost:4200, félicitations ! L'application fonctionne.

## 💡 Conseils

1. **Ouvrez les DevTools** (F12) pour voir les logs et les requêtes réseau
2. **Utilisez Postman** pour tester les APIs directement
3. **Consultez README.md** pour plus de détails sur l'architecture

## 🆘 Besoin d'Aide ?

Vérifiez les logs dans les terminaux :
- **Backend**: Erreurs de base de données, de validation
- **Frontend**: Erreurs de compilation, requêtes HTTP

---

**Bon développement ! 🚀**
