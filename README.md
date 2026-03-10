# CodePaste App

CodePaste App is a small React app for creating, saving, editing, viewing, copying, and deleting text/code snippets in the browser.

The project uses React, Redux Toolkit, React Router, Tailwind CSS, and Vite. Paste data is stored in `localStorage`, so the app works without a backend.

## Features

- Create a new paste with a title and content
- Edit an existing paste
- View a single paste on its own route
- Search saved pastes by title or content
- Copy paste content to the clipboard
- Delete individual pastes
- Clear all saved pastes
- Persist data with `localStorage`

## Tech Stack

- React 19
- Vite
- Redux Toolkit
- React Redux
- React Router DOM
- Tailwind CSS
- React Hot Toast

## Project Structure

```text
src/
  app/
    store.js
  components/
    Home.jsx
    Navbar.jsx
    Pastes.jsx
    ViewPaste.jsx
  redux/
    PasteSlice.js
  App.jsx
  index.css
  main.jsx
```

## Routes

- `/` : Create a new paste or edit an existing one through the `pasteId` query param
- `/pastes` : View all saved pastes
- `/pastes/:id` : View a single paste

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview the production build

```bash
npm run preview
```

## How It Works

- The form on the home page creates a new paste when no `pasteId` is present.
- If `pasteId` exists in the URL, the form loads that paste and updates it.
- Redux manages the paste list.
- Each create, update, or delete action also syncs the latest state to `localStorage`.

## Notes

- This project currently uses browser storage only. Data is local to the current browser.
- Clipboard copy depends on browser support for `navigator.clipboard`.

## Repo Name Suggestion

If you want to push this project to GitHub, a clean repo name is:

```text
codepaste-app
```
