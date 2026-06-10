# Deploy ke Vercel

Project sekarang sudah berada langsung di root repository.

## Setting di Vercel

Saat import repository GitHub ke Vercel, gunakan pengaturan berikut:

- Root Directory: kosongkan / gunakan root repository
- Framework Preset: `Next.js`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: kosongkan agar Vercel memakai default Next.js
- Node.js Version: `20.x`

## Catatan

- File `package.json` dan `vercel.json` sekarang ada di root repository.
- Vercel bisa langsung mendeteksi project Next.js tanpa folder tambahan `nazwatersayang-main`.
- File `.gitignore` root sudah mencakup `.next`, `node_modules`, `.vercel`, dan file build lainnya.
