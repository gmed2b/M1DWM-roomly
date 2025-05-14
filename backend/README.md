# 🚀 Backend — Roomly

Ce dossier contient l'API de **Roomly**, l'application de réservation de salles professionnelles.

---

## 🧱 Stack utilisée

- **[Flask](https://flask.palletsprojects.com/)** — Framework web Python
- **[SQLAlchemy](https://www.sqlalchemy.org/)** — ORM pour la gestion de la base de données
- **[Pydantic](https://docs.pydantic.dev/)** — Validation des données
- **[Alembic](https://alembic.sqlalchemy.org/)** — Gestion des migrations de base de données
- **Python 3.10+** — Langage de programmation

---

## 🚀 Démarrage local

```bash
# Aller dans le dossier backend
cd backend

# Créer un environnement virtuel
python -m venv venv
source venv/bin/activate  # Sur Linux/Mac
# ou
.\venv\Scripts\activate  # Sur Windows

# Installer les dépendances
pip install -r requirements.txt

# Lancer le serveur de développement
flask run

# L'API sera accessible à l'adresse :
# http://127.0.0.1:8000
```

---

## 🔧 Scripts disponibles

| Commande                | Description                            |
| ---------------------- | -------------------------------------- |
| `flask run`            | Lance l'environnement de développement |
| `flask db upgrade`     | Applique les migrations de base de données |
| `pytest`               | Exécute les tests unitaires            |
| `black .`              | Formatte le code avec Black            |
| `flake8`               | Analyse du code avec Flake8            |

---

## 📁 Structure (principale)

```
backend/
├── app/                # Code source principal
│   ├── api/           # Points d'entrée de l'API
│   ├── models/        # Modèles de données
│   ├── schemas/       # Schémas Pydantic
│   └── services/      # Logique métier
├── migrations/         # Fichiers de migration Alembic
├── tests/             # Tests unitaires
├── requirements.txt   # Dépendances Python
└── ...
```

---

## 🔐 Variables d'environnement

Créez un fichier `.env` à la racine du dossier backend avec les variables suivantes :

```env
FLASK_APP=app
FLASK_ENV=development
DATABASE_URL=postgresql://user:password@127.0.0.1:5432/roomly
SECRET_KEY=votre_cle_secrete
```

---

## ✨ À venir

- Implémentation complète des endpoints API
- Système d'authentification
- Validation des données
- Tests unitaires et d'intégration

---

## 👨‍💻 Auteur

Projet développé dans le cadre du **Master Informatique** 