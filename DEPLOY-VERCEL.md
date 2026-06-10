# Deploy ke Vercel

Project yang harus dibaca Vercel ada di folder:

`nazwatersayang-main/HAPPY-BIRTHDAY-V5-main`

## Setting di Vercel

Saat import repository GitHub ke Vercel, gunakan pengaturan berikut:

- Root Directory: `nazwatersayang-main/HAPPY-BIRTHDAY-V5-main`
- Framework Preset: `Next.js`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: kosongkan agar Vercel memakai default Next.js
- Node.js Version: `20.x`

## Catatan

- File `vercel.json` sudah disediakan di dalam folder project app.
- File `.gitignore` lokal di folder app sudah mengabaikan `.next`, `node_modules`, dan folder build lain.
- Setelah `Root Directory` diarahkan ke folder app, Vercel akan membaca `package.json` dan `vercel.json` dari folder tersebut.
