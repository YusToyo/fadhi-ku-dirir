import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fadhi Ku Dirir — The Somali Debate Platform",
  description: "Watch live debates, vote for your side, and decide who wins. Fadhi Ku Dirir — Endless Ideas & Dialogue.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="so">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-cream text-charcoal">
        {children}
      </body>
    </html>
  );
}
