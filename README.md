# Structure du Projet Forum RP

## Architecture des Dossiers

src/
├── config/ # Configuration de l'application
├── modules/
│ ├── auth/ # Authentification et autorisation
│ ├── users/ # Gestion des utilisateurs
│ ├── forums/ # Gestion des forums et topics
│ ├── characters/ # Gestion des personnages RP
│ ├── messages/ # Système de messagerie
│ ├── websockets/ # Gestion des WebSockets
│ ├── ai/ # Intégration IA
│ ├── gamification/ # Système de niveaux et badges
│ └── groups/ # Gestion des groupes
├── shared/
│ ├── guards/ # Guards de sécurité
│ ├── decorators/ # Décorateurs personnalisés
│ ├── interfaces/ # Interfaces communes
│ └── utils/ # Utilitaires
└── main.ts

## Feuille de Route

### Phase 1 : Fondations (Sprint 1-2) 🔒

- [ ] Initialisation du projet NestJS
- [ ] Configuration de la base de données (PostgreSQL)
- [ ] Mise en place de l'authentification (JWT + Refresh Token)
- [ ] Configuration des variables d'environnement
- [ ] Mise en place des rôles et permissions
- [ ] CI/CD initial

### Phase 2 : Core Features (Sprint 3-4) 👥

- [ ] CRUD utilisateurs avec validation complète
- [ ] Profils utilisateurs avec avatars
- [ ] Système de rôles hiérarchique
- [ ] Double authentification (2FA)
- [ ] Gestion des sessions

### Phase 3 : Forum & RP (Sprint 5-6) 📝

- [ ] Création et gestion des catégories
- [ ] Système de topics avec états (ouvert/fermé/archivé)
- [ ] Système de réponses avec formatage riche
- [ ] Outils de modération avancés
- [ ] Système de tags et recherche full-text

### Phase 4 : Temps Réel (Sprint 7-8) 🔄

- [ ] Infrastructure WebSocket scalable
- [ ] Gestion des rooms par catégorie/topic
- [ ] Système de notifications en temps réel
- [ ] Indicateurs de présence et typing
- [ ] Chat temps réel dans les topics

### Phase 5 : Social & Messaging (Sprint 9-10) 💬

- [ ] Messagerie privée chiffrée
- [ ] Discussions de groupe avec rôles
- [ ] Centre de notifications configurable
- [ ] Historique et recherche des conversations
- [ ] Partage de médias sécurisé

### Phase 6 : IA & Innovation (Sprint 11-12) 🤖

- [ ] Intégration OpenAI avec rate limiting
- [ ] Génération d'avatars personnalisés
- [ ] Modération automatique du contenu
- [ ] Suggestions de contenu contextuelles
- [ ] Assistant RP intelligent

### Phase 7 : Engagement (Sprint 13-14) 🎮

- [ ] Système de progression dynamique
- [ ] Badges et achievements personnalisables
- [ ] Système de réputation
- [ ] Événements temporaires
- [ ] Classements et compétitions

## Standards Techniques

### Architecture

- Architecture hexagonale
- CQRS pour les opérations complexes
- Event-driven pour les notifications
- API REST avec versioning

### Sécurité

- Validation des entrées (class-validator)
- Rate limiting par IP et par utilisateur
- CORS configurable par environnement
- Sanitization automatique des données
- Audit logging

### Qualité du Code

- Tests unitaires (Jest)
- Tests e2e (Supertest)
- Documentation OpenAPI/Swagger
- Conventional Commits
- Code review obligatoire

### Performance

- Pagination avec curseurs
- Indexation optimisée
- Cache multi-niveaux (Redis)
- Compression gzip/brotli
- Lazy loading

## Stack Technique

- NestJS 10+
- PostgreSQL 15+
- TypeScript 5+
- Redis 7+
- WebSocket (Socket.io)
- OpenAI API
- Docker & Docker Compose
- GitHub Actions

## Technologies Utilisées

- NestJS
- PostgreSQL
- TypeScript
- JWT
- WebSocket
- Redis
- OpenAI API
# lolrp-ia
