# Love Letter App

## Overview
An interactive love letter / envelope web application built with React (Vite) frontend and Express backend, using PostgreSQL for data persistence.

## Project Architecture
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + Radix UI components
- **Backend**: Express 5 (TypeScript, runs via tsx)
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: wouter (client-side), Express (server-side API)
- **State Management**: TanStack React Query

## Project Structure
```
client/          - React frontend (Vite)
  src/           - Components, pages, hooks, lib
  public/        - Static assets (favicon, music)
server/          - Express backend
  index.ts       - Entry point (port 5000)
  routes.ts      - API routes
  db.ts          - Database connection (Drizzle + pg)
  vite.ts        - Vite dev server middleware
  static.ts      - Static file serving (production)
shared/          - Shared types and schema
  schema.ts      - Drizzle schema (interactions table)
  routes.ts      - Shared route definitions
script/          - Build scripts
  build.ts       - Production build (esbuild + vite)
attached_assets/ - Image assets
```

## Key Configuration
- Dev server: `npm run dev` (tsx server/index.ts) on port 5000
- Build: `npm run build` (builds client with Vite, server with esbuild)
- Production: `npm run start` (node dist/index.cjs)
- DB push: `npm run db:push` (drizzle-kit push)
- Single server serves both API and frontend
- Vite runs in middleware mode during development

## Recent Changes
- 2026-02-09: Initial import and setup in Replit environment
  - Created PostgreSQL database
  - Installed dependencies (including nanoid)
  - Pushed database schema
  - Configured workflow and deployment
