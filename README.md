# 🏢 Roomly — Plateforme de Réservation de Salles

**Roomly** est une application web de réservation de salles pour des événements professionnels. Le projet a été conçu dans le cadre d’un **Master Informatique** et vise à appliquer les principes du **DevOps**, du **développement agile (Scrum)**, et de la **gestion complète du cycle de vie logiciel** (de l'expression du besoin jusqu’au déploiement continu).

---

## 🎯 Objectifs pédagogiques

- Gérer un projet complet (analyse, développement, déploiement)
- Appliquer la méthode **Scrum** (gestion de backlog, sprints, rétrospectives)
- Mettre en œuvre une **pipeline CI/CD** avec GitHub Actions
- Utiliser des outils modernes pour le **développement collaboratif**
- Proposer une architecture robuste, scalable et maintenable

---

## 🧱 Stack Technique

| Côté            | Technologies principales               |
| --------------- | -------------------------------------- |
| Frontend        | Next.js, Shadcn                        |
| Backend         | Flask                                  |
| Base de données | Supabase, PostgreSQL                   |
| CI/CD           | GitHub Actions, Docker, Docker Compose |
| Infra           | NGINX, Docker Compose                  |

---

## 📁 Structure du projet

```

roomly/
├── frontend/             # Site web (Next.js)
├── backend/              # REST API (Flask)
├── infra/                # Docker, NGINX, configuration d’infrastructure
├── .github/              # Workflows GitHub Actions (CI/CD)
├── docker-compose.yml
├── README.md
└── .env.example

```

---

## 🚀 Démarrage local (développement)

### ⚙️ Prérequis

- [Node.js](https://nodejs.org/)
- [Docker + Docker Compose](https://www.docker.com/)
- [Python 3.10+](https://www.python.org/)
- [Git](https://git-scm.com/)

### 📦 Installation & lancement

```bash
# Cloner le dépôt
git clone https://github.com/gmed2b/M1DWM-roomly.git roomly
cd roomly

# Démarrer les services (frontend + backend)
docker-compose up --build
```

- Frontend : [http://127.0.0.1:3000](http://127.0.0.1:3000)
- Backend : [http://127.0.0.1:5000/docs](http://127.0.0.1:5000/docs) (Flask Swagger)

---

## 🔄 Workflow Git (Git Flow Simplifié)

### 🌿 Branches principales

- `main` : branche de production stable (déploiement continu)
- `develop` : intégration continue (merge des fonctionnalités validées)
- `feature/` : développement d’une nouvelle fonctionnalité
- `fix/` : correction de bug
- `hotfix/` : correction urgente en production

### 🧑‍💻 Développer une nouvelle fonctionnalité (frontend ou backend)

```bash
# 1. Basculer sur develop
git checkout develop
git pull origin develop

# 2. Créer une branche pour la fonctionnalité, le fix ou la release
git checkout -b feature/nouvelle-fonction

# 3. Développer dans frontend/ ou backend/
cd frontend
# ou
cd backend

# 4. Ajouter, commit et push
git add .
git commit -m "feat: ajout du formulaire de réservation"
git push origin feature/nouvelle-fonction

# 5. Créer une Pull Request vers develop via GitHub
```

⚠️ **Les branches sont soumises à la CI/CD** (lint, build, tests unitaires). La PR ne sera fusionnée que si tout passe.

---

## 🔁 CI/CD (GitHub Actions)

Les pipelines automatisent :

- Lint, build et test du frontend (`.github/workflows/frontend.yml`)
- Build, tests API et analyse statique backend (`backend.yml`)
- Déploiement futur (Render, Railway, VPS...) après merge sur `main`

---

## 📄 Documentation

- `docs/architecture.md` : description de l’architecture logicielle
- `docs/readme-sprintX.md` : livrables de chaque sprint Scrum

---

## 👨‍🎓 Réalisé par

- Mathieu Michelozzi — Développeur Backend - Chargé de projet

- Dorian Lovichi — Développeur Frontend - Scrum Master

- Achille Poirier — DevOps - Administrateur système

- Mehdi Ghoulam — Développeur Fullstack - Lead developpeur

> Projet réalisé dans le cadre du **Master Informatique - Parcours DevOps / Ingénierie Logicielle**

---

## 📄 Licence

Ce projet est sous licence MIT — libre d'utilisation et de modification.
