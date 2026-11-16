# Funko Pop Manager (AT2 - LDW)

SPA em React + TypeScript + Vite + Tailwind + shadcn/ui que consome a API REST da AT1
(Node, Express, Sequelize, PostgreSQL) para gerenciar uma coleção de Funko Pops.

## Pré-requisitos
- Node 20+ e pnpm

## Backend
```bash
cd backend
cp .env.example .env   # preencha DB_PASSWORD
pnpm install
pnpm dev               # http://localhost:3000/api-docs
```

## Frontend
```bash
cd frontend
cp .env.example .env   # VITE_API_URL=http://localhost:3000
pnpm install
pnpm dev
```

## Funcionalidades
Listagem, cadastro, edição e exclusão (CRUD) com loading, empty state e toasts.