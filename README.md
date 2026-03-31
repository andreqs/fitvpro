# Landing Page (Vite + React)

Landing page construida con React, Vite y Tailwind CSS.

## Requisitos

- Node.js 18+
- npm 9+

## Desarrollo local

1. Instala dependencias:
   - `npm install`
2. Crea tu entorno local copiando el ejemplo:
   - `copy .env.example .env` (Windows)
3. Inicia el proyecto:
   - `npm run dev`

## Variables de entorno

El proyecto usa:

- `VITE_GOOGLE_SCRIPT_URL`: endpoint de Google Apps Script para el formulario.

`.env` esta ignorado por Git. Usa `.env.example` como plantilla.

## Build de produccion

- `npm run build`
- `npm run preview`

## Subir a GitHub

Ejecuta estos comandos en la raiz del proyecto:

```bash
git init
git add .
git commit -m "Initial commit: landing page"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

## Deploy en Vercel con dominio Hostinger

1. Conecta el repositorio en Vercel.
2. Agrega tu dominio en `Project Settings > Domains`.
3. En Hostinger, crea los registros DNS que te indique Vercel.
4. Espera propagacion DNS y verifica HTTPS activo.
