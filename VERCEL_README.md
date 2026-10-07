# Virtual Web Session frontend

Vite + React frontend for deployment on Vercel.

## Vercel settings

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`
- Root directory: repository root

## Environment variable

In Vercel Project Settings → Environment Variables, add:

```text
VITE_BACKEND_URL=https://rolex-bypass.onrender.com
```

Select Production, Preview, and Development, then redeploy.

> Note: this package contains the current frontend UI/demo. The environment variable is prepared for backend integration, but the current UI must be wired to `/session` and `/ws` before it can display live Render frames.
