# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Build l'application
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Copier package.json pour les dépendances de production
COPY package*.json ./

# Installer uniquement les dépendances de production
RUN npm ci --only=production

# Copier le build depuis le stage builder
COPY --from=builder /app/dist ./dist

# Exposer le port
EXPOSE 3000

# Commande de démarrage
CMD ["node", "dist/main"]
