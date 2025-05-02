# 🖥️ Frontend — Roomly

Ce dossier contient l'interface utilisateur de **Roomly**, l'application de réservation de salles professionnelles.

---

## 🧱 Stack utilisée

- **[Next.js](https://nextjs.org/)** — Framework React fullstack
- **[Shadcn/UI](https://ui.shadcn.dev/)** — UI components basés sur TailwindCSS & Radix
- **[TailwindCSS](https://tailwindcss.com/)** — Framework CSS utilitaire
- **TypeScript** — Typage statique pour un code plus sûr

---

## 🚀 Démarrage local

```bash
# Aller dans le dossier frontend
cd frontend

# Installer les dépendances
npm install

# Lancer le serveur de dev
npm run dev

# L'application sera accessible à l'adresse :
# http://localhost:3000
```

---

## 🔧 Scripts disponibles

| Commande         | Description                            |
| ---------------- | -------------------------------------- |
| `npm run dev`    | Lance l'environnement de développement |
| `npm run build`  | Compile l'app pour la production       |
| `npm run lint`   | Analyse du code avec ESLint            |
| `npm run format` | Formatte le code avec Prettier         |

---

## ⚙️ Configuration Vercel

Si vous utilisez [Vercel](https://vercel.com/) :

- **Root Directory** : `frontend/`
- **Build Command** : `npm run build`
- **Output Directory** : `.next`

---

## 📁 Structure (principale)

```
frontend/
├── app/                # Routing + pages (App Router)
├── components/         # Composants réutilisables
├── lib/                # Fonctions utilitaires
├── styles/             # Fichiers CSS (si besoin)
├── public/             # Fichiers statiques
├── tailwind.config.ts  # Configuration Tailwind
├── tsconfig.json       # Configuration TypeScript
└── ...
```

---

## ✨ À venir

- Système d'authentification
- Pages de recherche, fiche salle, réservation
- Intégration backend (API FastAPI)

---

## 👨‍💻 Auteur

Projet développé dans le cadre du **Master Informatique**
