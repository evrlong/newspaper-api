# Newspaper API

A TypeScript + Express REST API for authentication, users, and articles, backed by MySQL.

## Installation And Configuration

### Prerequisites

- Node.js 20+ (recommended)
- npm
- MySQL server

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root (or copy from `.env.example`):

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=news
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1h

```

Notes:
- Make sure the MySQL database in `DB_NAME` exists.
- Update `DB_USER` and `DB_PASSWORD` to match your local MySQL setup.

### 3. Run the project

Start in development mode (auto-reload):

```bash
npm run dev
```

Build TypeScript:

```bash
npm run build
```

Run production build:

```bash
npm start
```

### 4. API docs

After starting the server, open:

- `http://localhost:3000/api-docs`

## Available Scripts

- `npm run dev` - Runs the server with `tsx` watch mode.
- `npm run build` - Compiles TypeScript to `dist/`.
- `npm start` - Starts the compiled app from `dist/index.js`.
- `npm run lint` - Lints the codebase with ESLint.
- `npm run format` - Formats files with Prettier.

## Motivation

I chose **option 1** because I enjoyed working on server-side development: designing endpoints, validating data, and implementing authentication/authorization flows.

What I liked most was the structure of the process: splitting the app into controllers, routes, repositories, and middleware made it easier to reason about responsibilities and keep the code maintainable. What I enjoyed less was repetitive setup work (environment variables, local DB configuration, and keeping schemas/types in sync).

The most difficult part was handling secure auth end-to-end (token handling, validation, and protected routes) while also keeping error handling consistent.

I think a custom API gives more control over architecture, business rules, and security decisions, which is great for learning and for projects with specific requirements. A SaaS backend like Supabase can reduce setup time and speed up delivery, but it trades some flexibility and low-level control for convenience.
