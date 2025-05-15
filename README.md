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
| Base de données | PostgreSQL, Google Cloud SQL           |
| CI/CD           | GitHub Actions, Dockerfile             |
| Infra           | Google Cloud Run                       |

---

## 📁 Structure du projet

```

roomly/
├── frontend/             # Site web (Next.js)
├── backend/              # REST API (Flask)
├── .github/              # Workflows GitHub Actions (CI/CD)
└── README.md

```

---

## 🚀 Démarrage local (développement)

### ⚙️ Prérequis

- [Node.js](https://nodejs.org/)
- [Python 3.10+](https://www.python.org/)
- [Git](https://git-scm.com/)

### 📦 Installation & lancement

```bash
# Cloner le dépôt
git clone https://github.com/gmed2b/M1DWM-roomly.git roomly
cd roomly

```

#### Backend
```bash
cd backend

python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
make run
```

#### Frontend

```bash
cd frontend

npm install --legacy-peer-deps
npm run dev
```

- Frontend : [http://localhost:3000](http://localhost:3000)
- Backend : [http://localhost:8080](http://localhost:8080)

---

## 🔄 Workflow Git (Git Flow Simplifié)

### 🌿 Branches principales

- `main` : branche de production stable (déploiement continu)
- `develop` : intégration continue (merge des fonctionnalités validées)
- `feature/` : développement d’une nouvelle fonctionnalité
- `fix/` : correction de bug

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

- Lint et build et deploiement du frontend (`.github/workflows/deploy-frontend-*.yml`)
- Build, tests et deploiement du backend (`.github/workflows/deploy-backend-*.yml`)

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
