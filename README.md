# TP EXPRESS

Application Node.js utilisant Express, Prisma, Socket.io, EJS et une base SQLite.

## Fonctionnalités principales

- Authentification simple (connexion admin)
- Session utilisateur (express-session)
- Chat en temps réel (Socket.io)
- Tableau de bord protégé
- Gestion des utilisateurs (CRUD via Prisma)
- Pages rendues côté serveur (EJS)
- Logger de requêtes (Morgan)
- Gestion d'erreurs et pages 404 personnalisées

## Structure des dossiers

- `app.js` : Point d'entrée principal, configuration d'Express, routes, sessions, sockets.
- `bin/www` : Lancement du serveur HTTP.
- `routes/` :
  - `index.js` : Authentification, chat, dashboard, déconnexion.
  - `users.js` : API RESTful pour les utilisateurs (CRUD via Prisma).
  - `admin.js` : Dashboard admin.
- `src/prisma.js` : Initialisation du client Prisma.
- `views/` : Templates EJS (`connexion`, `chat`, `dashboard`, etc.).
- `public/` : Fichiers statiques (CSS, JS, images).
- `prisma/` : Schéma Prisma et migrations.

## Installation

```bash
npm install
```

## Lancement

```bash
npm start
```
Le serveur écoute par défaut sur le port 8080.

## Utilisation

- Accès à `/connexion` pour se connecter (login: admin, password: admin)
- Accès à `/chat` pour le chat en temps réel
- Accès à `/dashboard` pour le tableau de bord (après connexion)
- API utilisateurs sur `/users` (GET, POST, GET/:id)

## Dépendances principales

- express
- ejs
- socket.io
- express-session
- prisma / @prisma/client
- better-sqlite3

## Lien du site en prodction

https://tpexpress.bertadrien.fr/
---
