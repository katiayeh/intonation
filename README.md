# Intonation

A web application to explore and compare Pythagorean and tempered intonation systems through interactive visualizations and audio playback.

## Features

- **Scales** — Choose a tonic, octave and scale type, then listen to it in either tempered or Pythagorean intonation.
- **Comparison** — Play both systems simultaneously to hear the difference in pitch for each note.
- **Beats** — Adjust two frequencies and hear the resulting beat phenomenon.
- **Overtones** — Visualize and listen to harmonics and sub-harmonics.
- **Methodology** — Read definitions and references about the physics behind intonation.

## Tech Stack

- [React](https://react.dev) 19 + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) 8
- [Recharts](https://recharts.org) for charts
- Web Audio API for sound playback
- i18n (French / English)

---

## Getting Started (Local)

### Prerequisites

- [Node.js](https://nodejs.org) **18+** (recommended: 20.x)
- npm (comes with Node.js)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/katiayeh/intonation.git
cd intonation

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Command             | Description                        |
|---------------------|------------------------------------|
| `npm run dev`       | Start the dev server with HMR      |
| `npm run build`     | Type-check and build for production|
| `npm run lint`      | Run ESLint                         |
| `npm run preview`   | Preview the production build       |
| `npm run deploy`    | Build and deploy to GitHub Pages   |

---

## Recommended VS Code Plugins

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) — linting
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) — code formatting
- [TypeScript Importer](https://marketplace.visualstudio.com/items?itemName=pmneo.tsimporter) — auto imports

---

## GitHub Pages

The app is deployed via the `gh-pages` branch.

1. Run `npm run deploy` — this builds the project and pushes the `dist/` folder to the `gh-pages` branch.
2. Go to **GitHub → Repository → Settings → Pages → Source** and select the `gh-pages` branch.
3. The site will be live at: `https://katiayeh.github.io/intonation`

---

## Disclaimer

This project is a work in progress. It is incomplete and may contain errors. Use it as a learning and experimentation tool, not as a reference.
