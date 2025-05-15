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
python -m venv .venv
source venv/bin/activate  # Sur Linux/Mac
# ou
.\venv\Scripts\activate  # Sur Windows

# Installer les dépendances
pip install -r requirements.txt

# Lancer le serveur de développement
make run

```

L'API sera accessible à l'adresse : [http://localhost:8080](http://localhost:8080)

---

## 🔧 Scripts disponibles

| Commande               | Description                                |
| ---------------------- | ------------------------------------------ |
| `make run `            | Lance l'environnement de développement     |
| `alembic upgrade head` | Applique les migrations de base de données |
| `python3 -m pytest`    | Exécute les tests unitaires                |

---

## 📁 Structure (principale)

```
backend/
├── app/               # Code source principal
│   ├── routes/           # Points d'entrée de l'API
│   ├── models/        # Modèles de données
│   ├── schemas/       # Schémas Pydantic
│   └── services/      # Logique métier
├── alembic/           # Fichiers de migration Alembic
├── tests/             # Tests unitaires
├── requirements.txt   # Dépendances Python
├── Dockerfile         # Dockerfile pour le déploiement
├── monitoring.py      # Monitoring de l'application
├── app.py             # Point d'entrée de l'application
├── run.py             # Script de démarrage en production
└── ...
```

---

## 🔐 Variables d'environnement

Copiez le fichier `.env.example` en `.env` et modifiez les valeurs selon vos besoins.

```bash
FLASK_ENV=development
PORT=8080
SECRET_KEY=your_secret_key
```
