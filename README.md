#  Development Platforms Course Assignment - Option 1: Newspaper API 

A TypeScript + Express REST API for authentication, users, and articles, backed by MySQL.

## Installation And Configuration

### Prerequisites

- Node.js 20+ 
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

I chose option 1, because I thought it was very interesting to learn about the server side. At the same time, I think it can be very useful to concentrate on the server side, so that you get a better insight into that part when you also have to work with the frontend. 

What I have found to be most demanding is getting a mental overview of the order of the files, e.g. when should jwt, bscript or Z be implemented. I feel like I have it handled well now, but I will probably have to do some quantity training on that part in the near future. 

All in all, a fun and educational task, which I feel has given me a new tool in my toolbox
