import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Selamat Ulang Tahun Ke-21, Nazwa Aulia Ingdana Zulfa ❤️",
  description:
    "Sebuah hadiah spesial untuk hari yang paling istimewa — Ulang Tahun Ke-21 Nazwa Aulia Ingdana Zulfa. Dengan cinta dan doa terbaik.",
  keywords: ["ulang tahun", "birthday", "Nazwa", "21"],
  authors: [{ name: "Dengan Cinta" }],
  openGraph: {
    title: "Selamat Ulang Tahun Ke-21, Nazwa ❤️",
    description: "Sebuah hadiah digital penuh cinta untuk Nazwa Aulia Ingdana Zulfa",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-midnight-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
