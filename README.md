Wehr App

Une application web complète de gestion des ressources humaines avec NestJS (Backend) et Angular (Frontend).

Mon Projet se trouve sur git , le nom de la branche est "vidal".
Le nom de la repository est "wehr_app".



cd C:\Users\vidal\wehr_app\backend (selon le chemin absolu de votre dossier backend)
npm run start:dev


Vous devriez voir :

[Nest] Application successfully started
TypeORM has created tables automatically


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
paramètres ( possibilité d'ajouter un user , il recoit un code temporaire , il peut changer son mot de passe , et apres il peut se connecter sur l'application)

Alors Pourquoi j'ai choisir NestJS comme Backend et Angular comme Frontend ?

Car NestJS est un framework moderne et performant pour les applications backend, il est facile d'apprendre et d'utiliser et c'est le meilleur framework pour les applications backend Node.js et quant à Angular, tout simplement parce que c'est la technologie la plus utilisée pour les applications frontend 

 NestJS + Angular est le choix idéal pour une application RH professionnelle, scalable et maintenable. C'est la stack TypeScript complète pour les applications d'entreprise modernes. 

