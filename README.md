# Manny Perez E-commerce Platform

An e-commerce platform built with React, TypeScript, Vite, and Redux Toolkit.

## 📚 Redux Documentation

**New to Redux in this project? Start here:**

- 📖 **[Complete Setup Guide](REDUX_COMPLETE_SUMMARY.md)** - Overview and quick start
- 📘 **[Detailed Guide](REDUX_SETUP_GUIDE.md)** - In-depth documentation with examples
- 📝 **[Cheat Sheet](REDUX_CHEATSHEET.md)** - Quick reference for daily coding
- 🔄 **[Data Flow Guide](REDUX_DATA_FLOW.md)** - Visual diagrams and flow explanations
- 👥 **[Team Workflow](TEAM_WORKFLOW.md)** - Collaboration guidelines

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
```bash
cp .env.example .env
# Edit .env and set VITE_API_BASE_URL
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Open Redux DevTools
- Press F12 in browser
- Go to "Redux" tab
- Watch state changes in real-time

## 🏗️ Project Structure

```
src/
├── store/                  # Redux state management
│   ├── services/          # RTK Query APIs
│   ├── slices/            # Redux slices
│   ├── examples/          # Implementation examples
│   └── hooks.ts           # Typed Redux hooks
├── components/            # React components
├── pages/                 # Page components
└── routes/                # Routing configuration
```

## 📦 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **RTK Query** - API calls & caching
- **React Router** - Routing
- **Tailwind CSS** - Styling

## 🎯 Redux Setup

This project uses Redux Toolkit for state management with:
- ✅ Type-safe hooks
- ✅ Automatic API caching
- ✅ Optimistic updates
- ✅ DevTools integration

See [REDUX_COMPLETE_SUMMARY.md](REDUX_COMPLETE_SUMMARY.md) for full details.

---

# Original Vite Template Info

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
